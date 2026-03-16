export interface ApiResourceIdentifier {
  id: string
  type: string
}

export interface ApiRelationship {
  data: ApiResourceIdentifier | ApiResourceIdentifier[] | null
}

export interface ApiRelationships {
  [key: string]: ApiRelationship | undefined
}

export interface ApiMeta {
  [key: string]: unknown
}

export interface ApiLinks {
  self?: string
  first?: string
  last?: string
  prev?: string | null
  next?: string | null
}

export interface JsonApiResponse<T> {
  data: T[]
  links?: ApiLinks
  meta?: ApiMeta
  included?: unknown[]
}

export interface JsonApiSingleResponse<T> {
  data: T
  links?: ApiLinks
  meta?: ApiMeta
  included?: unknown[]
}