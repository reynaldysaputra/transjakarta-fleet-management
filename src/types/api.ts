export interface ApiResourceIdentifier {
  id: string
  type: string
}

export interface ApiRelationshipLinks {
  self?: string
  related?: string
}

export interface ApiRelationship {
  links?: ApiRelationshipLinks
  data: ApiResourceIdentifier | null
}

export interface ApiRelationships {
  [key: string]: ApiRelationship | undefined
}

export interface ApiLinks {
  self?: string
  first?: string
  last?: string
  prev?: string | null
  next?: string | null
}

export interface ApiErrorSource {
  parameter?: string
}

export interface ApiErrorItem {
  detail?: string
  source?: ApiErrorSource
  status?: string
  code?: string
}

export interface ApiErrorResponse {
  errors: ApiErrorItem[]
}

export interface JsonApiResponse<T> {
  data: T[]
  links?: ApiLinks
}