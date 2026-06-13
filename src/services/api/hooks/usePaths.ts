import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../client"

export interface PathResult {
  nodes: { id: string; name: string; labels: string[] }[]
  relationships: { type: string; properties: Record<string, unknown> }[]
}

export function usePaths(fromId: string, toId: string, maxDepth = 6) {
  return useQuery({
    queryKey: ["paths", fromId, toId, maxDepth],
    queryFn: () =>
      apiClient.get<PathResult[]>(
        `/paths/${fromId}/${toId}?max_depth=${maxDepth}`,
      ),
    enabled: !!fromId && !!toId,
  })
}
