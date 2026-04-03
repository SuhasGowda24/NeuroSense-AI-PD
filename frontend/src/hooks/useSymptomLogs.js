import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../lib/axiosClient";

export function useSymptomLogs(limit = 30) {
  return useQuery({
    queryKey: ['symptomLogs', limit],
    queryFn: async () => {
      const res = await axiosClient.get(`/symptom-logs?limit=${limit}`);
      return res.data;
    },
    initialData: [],
  });
}

export function useUpsertSymptom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosClient.post("/symptom-logs", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symptomLogs'] });
    },
  });
}