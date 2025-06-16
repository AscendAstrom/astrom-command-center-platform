
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { faker } from 'https://esm.sh/@faker-js/faker@8.4.1';

export const managePatientVisits = async (supabase: SupabaseClient) => {
  // Get patients and departments
  const { data: patients } = await supabase.from('patients').select('id, status');
  const { data: departments } = await supabase.from('departments').select('id, name, type');
  const { data: beds } = await supabase.from('beds').select('id, status, department_id').eq('status', 'AVAILABLE').limit(20);
  
  if (!patients || !departments || patients.length === 0) return;

  // Clear existing visits
  await supabase.from('patient_visits').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const visitsToInsert = [];
  const activePatients = patients.filter(p => p.status === 'ACTIVE').slice(0, 40);

  for (const patient of activePatients) {
    const department = faker.helpers.arrayElement(departments);
    const bed = beds && beds.length > 0 ? faker.helpers.arrayElement(beds.filter(b => b.department_id === department.id)) : null;
    
    const admissionDate = faker.date.recent({ days: faker.number.int({ min: 1, max: 14 }) });
    const isDischarging = Math.random() < 0.2;
    
    // Generate realistic chief complaints based on department
    const getChiefComplaint = (deptType: string) => {
      const complaints = {
        'EMERGENCY': ['Chest pain', 'Shortness of breath', 'Abdominal pain', 'Head injury', 'Fever'],
        'CARDIOLOGY': ['Chest pain', 'Palpitations', 'Hypertension', 'Heart murmur'],
        'SURGERY': ['Pre-operative assessment', 'Post-operative care', 'Surgical consultation'],
        'ICU': ['Respiratory failure', 'Sepsis', 'Multi-organ dysfunction'],
        'default': ['General consultation', 'Follow-up visit', 'Routine check-up']
      };
      return faker.helpers.arrayElement(complaints[deptType] || complaints.default);
    };

    visitsToInsert.push({
      patient_id: patient.id,
      department_id: department.id,
      bed_id: bed?.id || null,
      visit_number: `V${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      admission_date: admissionDate.toISOString(),
      discharge_date: isDischarging ? faker.date.between({ from: admissionDate, to: new Date() }).toISOString() : null,
      status: isDischarging ? 'DISCHARGED' : 'ACTIVE',
      chief_complaint: getChiefComplaint(department.type),
      diagnosis: {
        primary: faker.helpers.arrayElement([
          'Hypertension', 'Diabetes Type 2', 'Pneumonia', 'Acute MI', 
          'COPD Exacerbation', 'UTI', 'Gastroenteritis', 'Fracture'
        ]),
        secondary: faker.helpers.arrayElement(['Obesity', 'Depression', 'Anxiety', null])
      },
      vital_signs: {
        temperature: faker.number.float({ min: 96.5, max: 101.2, precision: 0.1 }),
        blood_pressure: `${faker.number.int({ min: 110, max: 160 })}/${faker.number.int({ min: 70, max: 100 })}`,
        heart_rate: faker.number.int({ min: 60, max: 120 }),
        respiratory_rate: faker.number.int({ min: 12, max: 24 }),
        oxygen_saturation: faker.number.int({ min: 95, max: 100 })
      },
      medications: [
        {
          name: faker.helpers.arrayElement(['Lisinopril', 'Metformin', 'Atorvastatin', 'Aspirin']),
          dosage: faker.helpers.arrayElement(['5mg', '10mg', '20mg', '25mg']),
          frequency: faker.helpers.arrayElement(['Once daily', 'Twice daily', 'Three times daily'])
        }
      ],
      notes: `Patient ${isDischarging ? 'recovering well, ready for discharge' : 'stable, continuing treatment'}`
    });

    // Update bed status if assigned
    if (bed && !isDischarging) {
      await supabase.from('beds').update({ 
        status: 'OCCUPIED',
        patient_id: patient.id 
      }).eq('id', bed.id);
    }
  }

  if (visitsToInsert.length > 0) {
    const { error } = await supabase.from('patient_visits').insert(visitsToInsert);
    if (error) {
      console.error('Error inserting patient visits:', error);
    } else {
      console.log(`Created ${visitsToInsert.length} patient visits`);
    }
  }
};

export const manageWaitTimes = async (supabase: SupabaseClient) => {
  // Clear existing wait times
  await supabase.from('wait_times').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const { data: departments } = await supabase.from('departments').select('id, name, type');
  const { data: patients } = await supabase.from('patients').select('id').limit(30);
  
  if (!departments || !patients) return;

  const waitTimesToInsert = [];
  
  // Create realistic wait times for emergency department
  const edDepartment = departments.find(d => d.type === 'EMERGENCY');
  if (edDepartment) {
    for (let i = 0; i < 15; i++) {
      const arrivalTime = faker.date.recent({ days: 1 });
      const priorityLevel = faker.helpers.weightedArrayElement([
        { weight: 10, value: 1 }, // Critical
        { weight: 20, value: 2 }, // High
        { weight: 40, value: 3 }, // Medium
        { weight: 20, value: 4 }, // Low
        { weight: 10, value: 5 }  // Non-urgent
      ]);

      // Calculate realistic wait times based on priority
      const getWaitTimeByPriority = (priority: number) => {
        switch (priority) {
          case 1: return faker.number.int({ min: 0, max: 15 });   // Critical: 0-15 min
          case 2: return faker.number.int({ min: 10, max: 45 });  // High: 10-45 min
          case 3: return faker.number.int({ min: 30, max: 120 }); // Medium: 30-120 min
          case 4: return faker.number.int({ min: 60, max: 240 }); // Low: 1-4 hours
          case 5: return faker.number.int({ min: 120, max: 480 }); // Non-urgent: 2-8 hours
          default: return faker.number.int({ min: 30, max: 120 });
        }
      };

      const triageWait = getWaitTimeByPriority(priorityLevel);
      const providerWait = getWaitTimeByPriority(priorityLevel) + faker.number.int({ min: 15, max: 60 });
      
      const triageTime = new Date(arrivalTime.getTime() + triageWait * 60000);
      const seenTime = new Date(triageTime.getTime() + providerWait * 60000);
      const dischargeTime = Math.random() > 0.3 ? new Date(seenTime.getTime() + faker.number.int({ min: 30, max: 240 }) * 60000) : null;

      waitTimesToInsert.push({
        department_id: edDepartment.id,
        patient_id: faker.helpers.arrayElement(patients).id,
        arrival_time: arrivalTime.toISOString(),
        triage_time: triageTime.toISOString(),
        seen_by_provider_time: seenTime.toISOString(),
        discharge_time: dischargeTime?.toISOString() || null,
        priority_level: priorityLevel,
        total_wait_minutes: Math.floor((seenTime.getTime() - arrivalTime.getTime()) / 60000),
        triage_to_provider_minutes: Math.floor((seenTime.getTime() - triageTime.getTime()) / 60000)
      });
    }
  }

  if (waitTimesToInsert.length > 0) {
    const { error } = await supabase.from('wait_times').insert(waitTimesToInsert);
    if (error) {
      console.error('Error inserting wait times:', error);
    } else {
      console.log(`Created ${waitTimesToInsert.length} wait time records`);
    }
  }
};
