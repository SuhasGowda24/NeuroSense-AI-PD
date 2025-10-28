import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../lib/fetcher";

export function useSymptomLogs(limit = 30) {
  return useQuery({
    queryKey: ['symptomLogs', limit],
    queryFn: () => apiFetch(`/symptom-logs?limit=${limit}`),
    initialData: [],
  });
}

export function useUpsertSymptom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => apiFetch('/symptom-logs', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symptomLogs'] });
    },
  });
}
