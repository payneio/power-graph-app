import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../client"
import type {
  PaginatedResponse,
  SourceCreate,
  SourceResponse,
} from "@/types"

export function useSources(skip = 0, limit = 50) {
  return useQuery({
    queryKey: ["sources", skip, limit],
    queryFn: () =>
      apiClient.get<PaginatedResponse<SourceResponse>>(
        `/sources?skip=${skip}&limit=${limit}`,
      ),
  })
}

export function useSource(id: string) {
  return useQuery({
    queryKey: ["source", id],
    queryFn: () => apiClient.get<SourceResponse>(`/sources/${id}`),
    enabled: !!id,
  })
}

export function useCreateSource() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: SourceCreate) =>
      apiClient.post<SourceResponse>("/sources", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sources"] })
    },
  })
}
