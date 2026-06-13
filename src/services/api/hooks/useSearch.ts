import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../client"
import type { SearchResult } from "@/types"

export function useSearch(query: string, limit = 20) {
  return useQuery({
    queryKey: ["search", query, limit],
    queryFn: () =>
      apiClient.get<SearchResult[]>(
        `/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      ),
    enabled: query.length >= 2,
  })
}
