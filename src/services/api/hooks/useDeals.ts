import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../client"
import type {
  PaginatedResponse,
  DealCreate,
  DealResponse,
  DealPartyAdd,
} from "@/types"

export function useDeals(skip = 0, limit = 50) {
  return useQuery({
    queryKey: ["deals", skip, limit],
    queryFn: () =>
      apiClient.get<PaginatedResponse<DealResponse>>(
        `/deals?skip=${skip}&limit=${limit}`,
      ),
  })
}

export function useDeal(id: string) {
  return useQuery({
    queryKey: ["deal", id],
    queryFn: () => apiClient.get<DealResponse>(`/deals/${id}`),
    enabled: !!id,
  })
}

export function useCreateDeal() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: DealCreate) =>
      apiClient.post<DealResponse>("/deals", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["deals"] })
    },
  })
}

export function useAddDealParty(dealId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: DealPartyAdd) =>
      apiClient.post<DealResponse>(`/deals/${dealId}/parties`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["deal", dealId] })
      qc.invalidateQueries({ queryKey: ["deals"] })
    },
  })
}

export function useAddDealSource(dealId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (sourceId: string) =>
      apiClient.post<DealResponse>(
        `/deals/${dealId}/sources?source_id=${sourceId}`,
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["deal", dealId] })
    },
  })
}
