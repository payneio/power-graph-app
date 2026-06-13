// Enums

export type EntityType = "PERSON" | "ORGANIZATION" | "LOCATION" | "ASSET"

export type PartyRole =
  | "buyer"
  | "seller"
  | "advisor"
  | "guarantor"
  | "investor"
  | "lender"
  | "borrower"

export type OrgType =
  | "corporation"
  | "llc"
  | "nonprofit"
  | "government"
  | "political"
  | "trust"
  | "fund"
  | "other"

export type SourceType =
  | "news"
  | "government"
  | "court"
  | "sec"
  | "lobbyist"
  | "campaign"
  | "corporate"
  | "academic"
  | "other"

// Pagination

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  skip: number
  limit: number
}

// Entities

export interface PersonCreate {
  name: string
  birth_year?: number | null
  nationality?: string | null
  description?: string | null
}

export interface PersonResponse {
  canonical_id: string
  name: string
  birth_year: number | null
  nationality: string | null
  description: string | null
  created_at: string
  updated_at: string
  connection_count: number
}

export interface OrganizationCreate {
  name: string
  type?: OrgType
  jurisdiction?: string | null
  description?: string | null
}

export interface OrganizationResponse {
  canonical_id: string
  name: string
  type: OrgType
  jurisdiction: string | null
  description: string | null
  created_at: string
  updated_at: string
  connection_count: number
}

// Assertions

export interface DealCreate {
  description: string
  date?: string | null
  amount?: number | null
  currency?: string
  instrument?: string | null
  status?: string | null
  source_id: string
}

export interface DealResponse {
  id: string
  description: string
  date: string | null
  amount: number | null
  currency: string
  instrument: string | null
  status: string | null
  created_at: string
  parties: DealParty[]
  sources: SourceResponse[]
}

export interface DealParty {
  entity_id: string
  entity_type: string
  name: string
  role: PartyRole
}

export interface DealPartyAdd {
  entity_id: string
  entity_type?: string
  role: PartyRole
}

export interface RoleCreate {
  person_id: string
  organization_id: string
  title: string
  start_date?: string | null
  end_date?: string | null
  is_current?: boolean
  source_id: string
}

export interface RoleResponse {
  id: string
  title: string
  start_date: string | null
  end_date: string | null
  is_current: boolean
  person: { canonical_id: string; name: string }
  organization: { canonical_id: string; name: string }
  created_at: string
}

export interface DonationCreate {
  donor_id: string
  donor_type?: string
  recipient_id: string
  recipient_type?: string
  amount: number
  date?: string | null
  election_cycle?: string | null
  source_id: string
}

export interface DonationResponse {
  id: string
  amount: number
  date: string | null
  election_cycle: string | null
  donor: { canonical_id: string; name: string; type: string }
  recipient: { canonical_id: string; name: string; type: string }
  created_at: string
}

export interface OwnershipStakeCreate {
  owner_id: string
  owner_type?: string
  target_id: string
  target_type?: string
  percentage?: number | null
  start_date?: string | null
  end_date?: string | null
  source_id: string
}

export interface OwnershipStakeResponse {
  id: string
  percentage: number | null
  start_date: string | null
  end_date: string | null
  owner: { canonical_id: string; name: string; type: string }
  target: { canonical_id: string; name: string; type: string }
  created_at: string
}

export interface LegalActionCreate {
  type: string
  filing_date?: string | null
  status?: string | null
  jurisdiction?: string | null
  description?: string | null
  source_id: string
}

export interface LegalActionResponse {
  id: string
  type: string
  filing_date: string | null
  status: string | null
  jurisdiction: string | null
  description: string | null
  parties: { canonical_id: string; name: string; role: string }[]
  created_at: string
}

export interface SanctionCreate {
  type: string
  authority: string
  start_date?: string | null
  end_date?: string | null
  description?: string | null
  source_id: string
}

export interface SanctionResponse {
  id: string
  type: string
  authority: string
  start_date: string | null
  end_date: string | null
  description: string | null
  entity: { canonical_id: string; name: string; type: string }
  created_at: string
}

// Provenance

export interface SourceCreate {
  name: string
  url?: string | null
  type?: SourceType
  quality_rating?: number | null
  publication_date?: string | null
}

export interface SourceResponse {
  id: string
  name: string
  url: string | null
  type: SourceType
  quality_rating: number | null
  publication_date: string | null
  retrieved_at: string
  created_at: string
}

export interface ExternalRefCreate {
  system: string
  external_id: string
  url?: string | null
}

export interface ExternalRefResponse {
  system: string
  external_id: string
  url: string | null
  created_at: string
}

export interface AliasCreate {
  name: string
  lang?: string | null
  script?: string | null
}

export interface AliasResponse {
  name: string
  lang: string | null
  script: string | null
  created_at: string
}

// Connections

export interface Connection {
  type: string
  direction: string
  properties: Record<string, unknown>
  entity: {
    canonical_id: string
    name: string
    labels: string[]
  }
}

// Search

export interface SearchResult {
  canonical_id?: string
  id?: string
  name: string
  type: string
  description?: string | null
  labels?: string[]
}

// Network

export interface NetworkNode {
  id: string
  name: string
  labels: string[]
}

export interface NetworkEdge {
  source: string
  target: string
  type: string
  properties: Record<string, unknown>
}

export interface NetworkGraph {
  nodes: NetworkNode[]
  edges: NetworkEdge[]
}
