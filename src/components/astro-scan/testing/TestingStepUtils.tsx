
export const getSamplePayload = (type: string) => {
  // Sample payloads have been removed to avoid using mock data.
  // Users should provide their own real data structures for testing.
  return "";
};

export const runTestValidation = async (testPayload: string, formData: any) => {
  // Simulate API test call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Basic mock validation logic without returning mock data
  try {
    if (!testPayload.trim()) {
      return {
        success: false,
        message: "Test failed: Payload is empty. Please provide a test payload."
      };
    }

    // For JSON-based types, attempt to parse
    if (['EPIC', 'FHIR', 'API'].includes(formData.type)) {
      JSON.parse(testPayload);
    }

    return {
      success: true,
      message: "Test successful! The payload structure appears valid. This is a mock validation and does not guarantee a successful connection.",
      data: {
        status: "Validated (Mock)",
        timestamp: new Date().toISOString(),
        notes: "This is a frontend-only validation."
      }
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        success: false,
        message: `Test failed: Invalid JSON format. ${error.message}`
      };
    }
    return {
      success: false,
      message: "Test failed: An unexpected error occurred during local validation."
    };
  }
};
