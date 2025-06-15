
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

const LAB_TEST_TYPES = [
    { name: 'Complete Blood Count', code: 'CBC', category: 'Hematology', reference_range_low: 4.5, reference_range_high: 11.0, unit: 'x10^9/L' },
    { name: 'Basic Metabolic Panel', code: 'BMP', category: 'Chemistry', reference_range_low: 70, reference_range_high: 100, unit: 'mg/dL' },
    { name: 'Lipid Panel', code: 'LIPID', category: 'Chemistry', reference_range_low: 0, reference_range_high: 200, unit: 'mg/dL' },
    { name: 'Liver Function Tests', code: 'LFT', category: 'Chemistry', reference_range_low: 7, reference_range_high: 56, unit: 'U/L' },
    { name: 'Urinalysis', code: 'UA', category: 'Microbiology', reference_range_low: null, reference_range_high: null, unit: '' },
    { name: 'Troponin I', code: 'TROP', category: 'Cardiology', reference_range_low: 0, reference_range_high: 0.04, unit: 'ng/mL' },
];

export const ensureLabTestTypes = async (supabase: SupabaseClient) => {
    const { count, error } = await supabase.from('lab_test_types').select('*', { count: 'exact', head: true });
    if (error) throw error;

    if (count === null || count === 0) {
        console.log('Lab test types not found, creating them...');
        const { error: insertError } = await supabase.from('lab_test_types').insert(LAB_TEST_TYPES);
        if (insertError) throw insertError;

        // Add critical values for Troponin
        const { data: troponinType } = await supabase.from('lab_test_types').select('id').eq('code', 'TROP').single();
        if (troponinType) {
            await supabase.from('critical_lab_values').insert({
                test_type_id: troponinType.id,
                critical_high: 0.4,
                description: 'High risk for myocardial infarction.'
            });
        }

        console.log(`${LAB_TEST_TYPES.length} lab test types created.`);
    }
};

export const manageLabTests = async (supabase: SupabaseClient) => {
    // 1. Sometimes create new lab tests for active patients
    if (Math.random() < 0.4) {
        const { data: activeVisits } = await supabase
            .from('patient_visits')
            .select('id, patient_id')
            .eq('status', 'ACTIVE')
            .limit(5);

        const { data: labTestTypes } = await supabase.from('lab_test_types').select('id, name, unit, reference_range_low, reference_range_high');
        const { data: staffList } = await supabase.from('staff').select('id').limit(10);
        
        if (activeVisits && activeVisits.length > 0 && labTestTypes && labTestTypes.length > 0 && staffList && staffList.length > 0) {
            const visit = activeVisits[Math.floor(Math.random() * activeVisits.length)];
            const testType = labTestTypes[Math.floor(Math.random() * labTestTypes.length)];
            const staff = staffList[Math.floor(Math.random() * staffList.length)];
            
            await supabase.from('lab_tests').insert({
                patient_id: visit.patient_id,
                visit_id: visit.id,
                test_type_id: testType.id,
                ordered_by_staff_id: staff.id,
                status: 'ORDERED'
            });
        }
    }

    // 2. Process existing lab tests
    const { data: testsToProcess, error } = await supabase
        .from('lab_tests')
        .select(`
            id, 
            status, 
            ordered_at,
            test_type_id,
            lab_test_types (
                reference_range_low,
                reference_range_high,
                unit
            ),
            critical_lab_values (
                critical_low,
                critical_high
            )
        `)
        .in('status', ['ORDERED', 'IN_PROGRESS']);
    
    if (error) {
        console.error("Error fetching lab tests to process:", error);
        return;
    }
    
    if (!testsToProcess) return;

    for (const test of testsToProcess) {
        if (Math.random() < 0.3) { // 30% chance to progress
            let newStatus: string | null = null;
            const updatePayload: any = {};

            if (test.status === 'ORDERED') {
                newStatus = 'IN_PROGRESS';
                updatePayload.specimen_collected_at = new Date().toISOString();
            } else if (test.status === 'IN_PROGRESS') {
                newStatus = 'COMPLETED';
                updatePayload.result_received_at = new Date().toISOString();
                
                const orderedAt = new Date(test.ordered_at);
                const receivedAt = new Date(updatePayload.result_received_at);
                updatePayload.turnaround_time_minutes = Math.floor((receivedAt.getTime() - orderedAt.getTime()) / 60000);

                const testType = test.lab_test_types as any;
                if(testType && testType.reference_range_low !== null) {
                    const rangeLow = testType.reference_range_low;
                    const rangeHigh = testType.reference_range_high;
                    const result = rangeLow + Math.random() * (rangeHigh - rangeLow) * 1.5; // Generate result, sometimes out of range
                    updatePayload.result_value = result.toFixed(2);
                    updatePayload.result_unit = testType.unit;
                    
                    if(result < rangeLow || result > rangeHigh) {
                        updatePayload.is_abnormal = true;
                    }

                    const criticalValues = (test as any).critical_lab_values?.[0];
                    if (criticalValues && ( (criticalValues.critical_low && result < criticalValues.critical_low) || (criticalValues.critical_high && result > criticalValues.critical_high) ) ) {
                        updatePayload.is_critical = true;
                    }
                } else {
                    updatePayload.result_value = Math.random() > 0.5 ? 'POSITIVE' : 'NEGATIVE';
                }
            }

            if (newStatus) {
                updatePayload.status = newStatus;
                await supabase.from('lab_tests').update(updatePayload).eq('id', test.id);
            }
        }
    }
};
