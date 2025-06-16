
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

export const generateAIPayload = async (formData: any) => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-test-payload', {
      body: { formData },
    });

    if (error) throw error;
    
    if (!data.payload) {
      throw new Error(data.message || "AI generation failed: No payload returned.");
    }

    return {
      success: true,
      payload: data.payload,
    };
  } catch (error: any) {
    console.error("Error generating AI payload:", error);
    
    // Provide a helpful fallback message
    let fallbackMessage = "Payload generation failed";
    if (error.message.includes("Edge Function returned a non-2xx status code")) {
      fallbackMessage = "AI service temporarily unavailable. The system will use a fallback generator for sample data.";
    }
    
    return {
      success: false,
      message: `${fallbackMessage}: ${error.message || "An unknown error occurred."}`
    };
  }
};
