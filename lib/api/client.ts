const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface AIOutlineRequest {
  work_id: string;
  sample_text: string;
}

export interface AIOutlineResponse {
  emotion_arc: string[];
  scenes: Array<{
    description: string;
    emotion: string;
    camera_work: string;
  }>;
  atmosphere: string;
  key_metaphors: string[];
}

export async function generateAIOutline(
  request: AIOutlineRequest
): Promise<AIOutlineResponse> {
  const response = await fetch(`${API_URL}/ai/outline`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`AI outline generation failed: ${response.statusText}`);
  }

  return response.json();
}

export async function healthCheck(): Promise<{ status: string }> {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) {
    throw new Error("API health check failed");
  }
  return response.json();
}

