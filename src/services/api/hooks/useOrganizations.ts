import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../client"
import type {
  PaginatedResponse,
  OrganizationCreate,
  OrganizationResponse,
  Connection,
} from "@/types"

export function useOrganizations(skip = 0, limit = 50, q?: string) {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) })
  if (q) params.set("q", q)
  return useQuery({
    queryKey: ["organizations", skip, limit, q],
    queryFn: () =>
      apiClient.get<PaginatedResponse<OrganizationResponse>>(
        `/organizations?${params}`,
      ),
  })
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: ["organization", id],
    queryFn: () =>
      apiClient.get<OrganizationResponse>(`/organizations/${id}`),
    enabled: !!id,
  })
}

export function useOrganizationConnections(id: string) {
  return useQuery({
    queryKey: ["organization", id, "connections"],
    queryFn: () =>
      apiClient.get<Connection[]>(`/organizations/${id}/connections`),
    enabled: !!id,
  })
}

export function useCreateOrganization() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: OrganizationCreate) =>
      apiClient.post<OrganizationResponse>("/organizations", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["organizations"] })
      qc.invalidateQueries({ queryKey: ["search"] })
    },
  })
}
