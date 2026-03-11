async function throwApiError(res: Response, fallback: string): Promise<never> {
  const raw = await res.text();
  const parsed = raw ? safeParseJson(raw) : null;
  const message = parsed?.error?.message ?? parsed?.detail ?? parsed?.message ?? raw ?? fallback;
  throw new Error(message || fallback);
}

function safeParseJson(raw: string): any {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const apiClient = async <T>(
  path: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(path, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    }
  });

  if (!res.ok) {
    await throwApiError(res, "API error");
  }
  return res.json();
};

export const fetchTodayPlan = async () => {
  return apiClient<{ date: string; workout: any; nutrition: any }>(
    '/api/v1/coach/today'
  );
};

export const swapExercise = async (payload: {
  type: 'exercise' | 'meal';
  original_id: string;
  replacement: { name: string; metadata: Record<string, any> };
}) => {
  return apiClient<{ plan: any; simulation: any }>(
    '/api/v1/coach/swap',
    {
      method: 'POST',
      body: JSON.stringify(payload)
    }
  );
};

export const fetchChallenges = async (page = 1) => {
  return apiClient<{ challenges: any[] }>(`/api/v1/challenges?page=${page}`);
};
