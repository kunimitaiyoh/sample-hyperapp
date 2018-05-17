export interface ValidationErrors {
  general: Violation[]
  fields: { [key: string]: Violation[] }
}

export interface Violation {
  message: string;
}
