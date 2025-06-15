
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const updateProtocolAdherence = async (supabase: SupabaseClient) => {
  const protocols = ['Sepsis Bundle', 'Stroke Protocol', 'MI Pathway'];
  for (const protocol of protocols) {
    const { error } = await supabase
      .from('protocol_adherence_metrics')
      .update({ adherence_value: Math.floor(Math.random() * 10) + 90, updated_at: new Date().toISOString() }) // 90-99%
      .eq('protocol_name', protocol);
    if (error) console.error(`Error updating ${protocol}:`, error.message);
  }
};

const manageMedicationAlerts = async (supabase: SupabaseClient) => {
  const { data: unresolvedAlerts, error: fetchError } = await supabase
    .from('medication_safety_alerts')
    .select('id')
    .eq('status', 'Pharmacist review pending');

  if (fetchError) {
    console.error('Error fetching unresolved alerts:', fetchError.message);
  } else if (unresolvedAlerts && unresolvedAlerts.length > 2) { // Resolve if more than 2 pending
    const alertToResolve = unresolvedAlerts[Math.floor(Math.random() * unresolvedAlerts.length)];
    const { error: updateError } = await supabase
      .from('medication_safety_alerts')
      .update({ status: 'Resolved by Pharmacist' })
      .eq('id', alertToResolve.id);
    if (updateError) console.error('Error resolving alert:', updateError.message);
  }

  const patients = ['David C.', 'Laura W.', 'Michael P.', 'Sarah T.', 'James H.'];
  const medications = ['Heparin', 'Insulin', 'Morphine', 'Vancomycin', 'Warfarin'];
  const alerts = ['dose exceeds limit', 'known allergy conflict', 'contraindicated with current meds'];
  
  const newAlert = {
    patient_name: patients[Math.floor(Math.random() * patients.length)],
    alert_details: `High Risk: ${medications[Math.floor(Math.random() * medications.length)]} - ${alerts[Math.floor(Math.random() * alerts.length)]}`,
    status: 'Pharmacist review pending',
  };
  const { error: insertError } = await supabase.from('medication_safety_alerts').insert(newAlert);
  if (insertError) console.error('Error inserting new alert:', insertError.message);
};

const addDiagnosticSuggestion = async (supabase: SupabaseClient) => {
  const patients = ['Chris G.', 'Jessica A.', 'Brian M.', 'Amanda L.', 'Kevin F.'];
  const conditions = [
    { name: 'Acute Kidney Injury', evidence: 'Rising creatinine, low urine output' },
    { name: 'Pulmonary Embolism', evidence: 'Sudden chest pain, tachycardia' },
    { name: 'Heart Failure Exacerbation', evidence: 'Shortness of breath, leg swelling' },
    { name: 'Sepsis', evidence: 'High lactate, fever, hypotension' },
  ];
  const selectedCondition = conditions[Math.floor(Math.random() * conditions.length)];

  const newSuggestion = {
    patient_name: patients[Math.floor(Math.random() * patients.length)],
    suggestion: selectedCondition.name,
    confidence: Math.floor(Math.random() * 20) + 75, // 75-94%
    evidence: selectedCondition.evidence,
  };
  const { error } = await supabase.from('predictive_diagnostic_suggestions').insert(newSuggestion);
  if (error) console.error('Error inserting diagnostic suggestion:', error.message);
};

const updateCarePathways = async (supabase: SupabaseClient) => {
  const pathways = ['Knee Replacement', 'COPD Management'];
  for (const pathway of pathways) {
    const { error } = await supabase
      .from('care_pathway_analytics')
      .update({ compliance_percent: Math.floor(Math.random() * 8) + 92, updated_at: new Date().toISOString() }) // 92-99%
      .eq('pathway_name', pathway);
    if (error) console.error(`Error updating ${pathway}:`, error.message);
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    await Promise.all([
      updateProtocolAdherence(supabaseClient),
      manageMedicationAlerts(supabaseClient),
      addDiagnosticSuggestion(supabaseClient),
      updateCarePathways(supabaseClient),
    ]);

    return new Response(JSON.stringify({ message: 'Clinical data updated successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Main function error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
