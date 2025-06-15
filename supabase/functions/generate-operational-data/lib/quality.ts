import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { faker } from 'https://esm.sh/@faker-js/faker@8.4.1';

const accreditationBodies = ['The Joint Commission', 'DNV GL', 'HFAP', 'CIHQ'];
const complianceRegulations = ['HIPAA', 'CLIA', 'OSHA', 'EMTALA'];
const riskAreas = ['Patient Falls', 'Medication Errors', 'Surgical Site Infections', 'Hospital-Acquired Infections'];
const qiInitiatives = ['Hand Hygiene Improvement', 'Sepsis Protocol Optimization', 'Reducing Patient Readmissions', 'Improving Medication Reconciliation'];
const educationTopics = ['Diabetes Management', 'Post-Operative Care', 'Understanding Your Medications', 'Heart-Healthy Diet'];

async function ensureQualityIndicators(supabase: SupabaseClient) {
  const { count, error } = await supabase.from('quality_indicators').select('*', { count: 'exact', head: true });
  if (error) { console.error('Error counting quality_indicators', error); return; }

  if (count === 0) {
      console.log('Populating quality_indicators...');
      const indicatorsToInsert = [
          { name: 'Patient Falls Rate', category: 'patient_safety', target_value: 0.5, unit: 'per 1000 patient-days', description: 'Rate of patient falls per 1000 patient-days.', data_source: 'Incident Reports' },
          { name: 'Medication Error Rate', category: 'patient_safety', target_value: 1.0, unit: '%', description: 'Percentage of medication administrations with errors.', data_source: 'Pharmacy Records' },
          { name: 'Patient Satisfaction', category: 'satisfaction', target_value: 4.5, unit: 'out of 5', description: 'Average patient satisfaction score.', data_source: 'Patient Surveys' },
          { name: 'Hand Hygiene Compliance', category: 'safety', target_value: 95.0, unit: '%', description: 'Compliance rate of hand hygiene protocols.', data_source: 'Direct Observation' }
      ];
      const { error: insertError } = await supabase.from('quality_indicators').insert(indicatorsToInsert);
      if (insertError) {
        console.error('Error inserting quality_indicators', insertError);
      } else {
        console.log('Inserted quality_indicators data.');
      }
  }
}

export async function ensureQualityData(supabase: SupabaseClient) {
  await ensureInitialData(supabase, 'accreditations', () => ({
    name: faker.company.name() + ' Accreditation',
    accrediting_body: faker.helpers.arrayElement(accreditationBodies),
    status: faker.helpers.arrayElement(['ACCREDITED', 'PENDING']),
    issue_date: faker.date.past({ years: 2 }),
    expiry_date: faker.date.future({ years: 2 }),
    next_review_date: faker.date.future({ years: 1 }),
  }));

  await ensureInitialData(supabase, 'compliance_areas', () => ({
    name: faker.commerce.department() + ' Compliance',
    regulation: faker.helpers.arrayElement(complianceRegulations),
    status: faker.helpers.arrayElement(['COMPLIANT', 'IN_PROGRESS', 'AT_RISK']),
    last_assessed_date: faker.date.past({ months: 6 }),
    owner_name: faker.person.fullName(),
  }));

  await ensureInitialData(supabase, 'risk_assessments', 5, async () => ({
    risk_description: faker.helpers.arrayElement(riskAreas),
    risk_level: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
    status: faker.helpers.arrayElement(['OPEN', 'MITIGATED']),
    owner_name: faker.person.fullName(),
  }));

  await ensureInitialData(supabase, 'quality_improvement_initiatives', 4, async () => ({
    name: faker.helpers.arrayElement(qiInitiatives),
    status: faker.helpers.arrayElement(['IN_PROGRESS', 'PLANNING', 'COMPLETED']),
    start_date: faker.date.past({ months: 3 }),
    owner_name: faker.person.fullName(),
  }));

  await ensureInitialData(supabase, 'education_materials', 10, () => ({
    title: faker.lorem.sentence(4),
    topic: faker.helpers.arrayElement(educationTopics),
    format: faker.helpers.arrayElement(['PDF', 'Video', 'Webpage']),
    url: faker.internet.url(),
  }));

  await ensureQualityIndicators(supabase);
}

async function manageQualityMeasurements(supabase: SupabaseClient) {
    const { data: indicators, error: indicatorsError } = await supabase.from('quality_indicators').select('id, target_value, unit');
    if(indicatorsError) { console.error('Error fetching quality indicators for measurements:', indicatorsError); return; }
    if(!indicators || indicators.length === 0) return;

    const measurementsToInsert = [];
    for (const indicator of indicators) {
        if (faker.datatype.boolean(0.3)) { // 30% chance to add a measurement
            let value;
            const target = indicator.target_value as number;
            if (indicator.unit === '%') {
                value = faker.number.float({ min: target > 5 ? target - 5 : 0, max: Math.min(100, target + 2), precision: 1 });
            } else if (indicator.unit === 'out of 5') {
                 value = faker.number.float({ min: target > 0.5 ? target - 0.5 : 0, max: 5, precision: 1 });
            } else {
                 value = faker.number.float({ min: 0, max: target + 0.5, precision: 2 });
            }

            measurementsToInsert.push({
                indicator_id: indicator.id,
                measurement_date: faker.date.recent({ days: 30 }),
                value: Math.max(0, value),
            });
        }
    }
    
    if (measurementsToInsert.length > 0) {
        const { error } = await supabase.from('quality_measurements').insert(measurementsToInsert);
        if (error) {
            console.error('Error inserting quality measurements:', error);
        }
    }
}

export async function manageQualityAndSafety(supabase: SupabaseClient) {
  await managePatientSurveys(supabase);
  await managePatientEducation(supabase);
  await manageQualityMeasurements(supabase);
}

async function managePatientSurveys(supabase: SupabaseClient) {
    const { data: visits, error: visitsError } = await supabase.from('patient_visits').select('id').limit(5);
    if(visitsError) { console.error('Error fetching patient visits for surveys:', visitsError); return; }
    if(!visits || visits.length === 0) return;

    for (const visit of visits) {
        if (faker.datatype.boolean(0.1)) { // 10% chance to add a survey
            await supabase.from('patient_surveys').insert({
                visit_id: visit.id,
                survey_date: faker.date.recent(),
                overall_satisfaction: faker.number.int({ min: 3, max: 5 }),
                communication_rating: faker.number.int({ min: 3, max: 5 }),
                cleanliness_rating: faker.number.int({ min: 2, max: 5 }),
                wait_time_rating: faker.number.int({ min: 2, max: 5 }),
            });
        }
    }
}

async function managePatientEducation(supabase: SupabaseClient) {
    const { data: visits, error: visitsError } = await supabase.from('patient_visits').select('id, patient_id').limit(10);
    if(visitsError) { console.error('Error fetching patient visits for education log:', visitsError); return; }
    if(!visits || visits.length === 0) return;

    const { data: materials, error: materialsError } = await supabase.from('education_materials').select('id').limit(10);
    if(materialsError) { console.error('Error fetching education materials:', materialsError); return; }
    if(!materials || materials.length === 0) return;

    for (const visit of visits) {
        if (faker.datatype.boolean(0.2)) { // 20% chance to log an education event
            await supabase.from('patient_education_log').insert({
                patient_id: visit.patient_id,
                visit_id: visit.id,
                material_id: faker.helpers.arrayElement(materials).id,
                delivered_by_staff_name: faker.person.fullName(),
                completion_status: faker.helpers.arrayElement(['Delivered', 'Viewed', 'Completed']),
                patient_feedback_score: faker.number.int({ min: 3, max: 5 }),
            });
        }
    }
}


async function ensureInitialData(supabase: SupabaseClient, tableName: string, countOrFactory: number | (() => any), factory?: () => any) {
  let count = 4;
  let dataFactory = countOrFactory;

  if (typeof countOrFactory === 'number') {
    count = countOrFactory;
    dataFactory = factory!;
  }

  const { count: existingCount, error: countError } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error(`Error counting ${tableName}:`, countError);
    return;
  }

  if (existingCount === null || existingCount < count) {
    const recordsToInsert = Array.from({ length: count - (existingCount || 0) }, dataFactory);
    const { error: insertError } = await supabase.from(tableName).insert(recordsToInsert);
    if (insertError) {
      console.error(`Error inserting into ${tableName}:`, insertError);
    } else {
      console.log(`Inserted ${recordsToInsert.length} records into ${tableName}`);
    }
  }
}
