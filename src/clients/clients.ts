export interface ValidationErrors {
  errors: Violation[];
}

export interface Violation {
  attributes: { [key: string]: any };
  field: string | undefined;
  invalidValue: any;
  message: string | undefined;
  type: string;
}
