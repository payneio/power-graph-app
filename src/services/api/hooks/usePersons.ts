import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../client"
import type {
  PaginatedResponse,
  PersonCreate,
  PersonResponse,
  AliasCreate,
  AliasResponse,
  ExternalRefCreate,
  ExternalRefResponse,
  Connection,
  NetworkGraph,
} from "@/types"

export function usePersons(skip = 0, limit = 50, q?: string) {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) })
  if (q) params.set("q", q)
  return useQuery({
    queryKey: ["persons", skip, limit, q],
    queryFn: () =>
      apiClient.get<PaginatedResponse<PersonResponse>>(
        `/persons?${params}`,
      ),
  })
}

export function usePerson(id: string) {
  return useQuery({
    queryKey: ["person", id],
    queryFn: () => apiClient.get<PersonResponse>(`/persons/${id}`),
    enabled: !!id,
  })
}

export function usePersonConnections(id: string) {
  return useQuery({
    queryKey: ["person", id, "connections"],
    queryFn: () => apiClient.get<Connection[]>(`/persons/${id}/connections`),
    enabled: !!id,
  })
}

export function usePersonNetwork(id: string, depth = 2) {
  return useQuery({
    queryKey: ["person", id, "network", depth],
    queryFn: () =>
      apiClient.get<NetworkGraph>(`/persons/${id}/network?depth=${depth}`),
    enabled: !!id,
  })
}

export function useCreatePerson() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PersonCreate) =>
      apiClient.post<PersonResponse>("/persons", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["persons"] })
      qc.invalidateQueries({ queryKey: ["search"] })
    },
  })
}

export function useAddPersonAlias(personId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: AliasCreate) =>
      apiClient.post<AliasResponse>(`/persons/${personId}/aliases`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["person", personId] })
    },
  })
}

export function useAddPersonRef(personId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: ExternalRefCreate) =>
      apiClient.post<ExternalRefResponse>(`/persons/${personId}/refs`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["person", personId] })
    },
  })
}
