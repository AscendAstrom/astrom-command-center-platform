
import { supabase } from "@/integrations/supabase/client";

export const runTestValidation = async (testPayload: string, formData: any) => {
  if (!testPayload.trim()) {
    return {
      success: false,
      message: "Test failed: Payload is empty. Please provide a test payload."
    };
  }

  try {
    const { data, error } = await supabase.functions.invoke('test-data-source', {
      body: { formData, testPayload },
    });

    if (error) throw error;

    // The invoked function should return the structure we need
    return data;
  } catch (error: any) {
    console.error("Error running test validation:", error);
    return {
      success: false,
      message: `Test failed: ${error.message || "An unknown error occurred during the test."}`
    };
  }
};

