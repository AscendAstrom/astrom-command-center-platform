
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

const INSURERS = ['Medicare', 'Medicaid', 'Blue Cross', 'Aetna', 'UnitedHealth', 'Cigna'];
const DENIAL_REASONS: any[] = ['CODING_ERROR', 'PRIOR_AUTH', 'NOT_COVERED', 'DUPLICATE_CLAIM', 'MEDICAL_NECESSITY', 'PATIENT_INELIGIBLE', 'OTHER'];

// Function to manage all financial data generation
export const manageFinancials = async (supabase: SupabaseClient) => {
    await createBillingForNewVisits(supabase);
    await processClaims(supabase);
};

// Create initial billing charges and claims for new visits
const createBillingForNewVisits = async (supabase: SupabaseClient) => {
    // Find recently discharged visits that don't have claims yet
    const { data: recentVisits, error: visitsError } = await supabase
        .from('patient_visits')
        .select(`
            id,
            patient_id,
            discharge_date,
            insurance_claims ( id )
        `)
        .eq('status', 'DISCHARGED')
        .is('insurance_claims.id', null)
        .limit(10);

    if (visitsError) {
        console.error("Error fetching recent visits for billing:", visitsError);
        return;
    }

    if (!recentVisits || recentVisits.length === 0) return;

    for (const visit of recentVisits) {
        // Create a primary billing charge
        const chargeAmount = 500 + Math.random() * 5000;
        const { error: chargeError } = await supabase
            .from('billing_transactions')
            .insert({
                visit_id: visit.id,
                patient_id: visit.patient_id,
                transaction_type: 'CHARGE',
                amount: chargeAmount,
                status: 'BILLED',
                description: 'Primary Visit Charge'
            });

        if (chargeError) {
            console.error("Error creating billing transaction:", chargeError);
            continue; // Skip to next visit
        }
        
        // Create an insurance claim for this charge
        const { error: claimError } = await supabase
            .from('insurance_claims')
            .insert({
                visit_id: visit.id,
                patient_id: visit.patient_id,
                insurer_name: INSURERS[Math.floor(Math.random() * INSURERS.length)],
                total_amount: chargeAmount,
                status: 'SUBMITTED',
            });
        
        if (claimError) {
            console.error("Error creating insurance claim:", claimError);
        }
    }
};

// Process submitted and pending claims
const processClaims = async (supabase: SupabaseClient) => {
    const { data: claimsToProcess, error } = await supabase
        .from('insurance_claims')
        .select('*')
        .in('status', ['SUBMITTED', 'PENDING'])
        .limit(20);

    if (error) {
        console.error("Error fetching claims to process:", error);
        return;
    }

    if (!claimsToProcess) return;

    for (const claim of claimsToProcess) {
        // 30% chance to process a claim in this cycle
        if (Math.random() < 0.3) {
            let newStatus: any = null;
            const updatePayload: any = {};
            
            if (claim.status === 'SUBMITTED') {
                newStatus = 'PENDING';
            } else if (claim.status === 'PENDING') {
                const resolution = Math.random();
                if (resolution < 0.85) { // 85% approval
                    newStatus = 'APPROVED';
                    updatePayload.paid_amount = parseFloat(claim.total_amount) * (0.8 + Math.random() * 0.2);
                } else { // 15% denial
                    newStatus = 'DENIED';
                    updatePayload.paid_amount = 0;
                    
                    await supabase.from('claim_denials').insert({
                        claim_id: claim.id,
                        denial_reason: DENIAL_REASONS[Math.floor(Math.random() * DENIAL_REASONS.length)],
                        details: 'Additional documentation required.'
                    });
                }
                updatePayload.resolution_date = new Date().toISOString();
                const submissionDate = new Date(claim.submission_date);
                const resolutionDate = new Date(updatePayload.resolution_date);
                updatePayload.processing_time_days = Math.ceil((resolutionDate.getTime() - submissionDate.getTime()) / (1000 * 3600 * 24));
            }

            if (newStatus) {
                updatePayload.status = newStatus;
                await supabase.from('insurance_claims').update(updatePayload).eq('id', claim.id);
            }
        }
    }
};
