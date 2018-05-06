import { IRegisterState } from "@/views/Register";

export class AppClient {
  protected static toFormData(record: {[key: string]: string | undefined }): FormData {
    return Object.keys(record)
        .reduce((o, key) => {
          const value = record[key];
          return (value !== undefined) ? (o.set(key, value), o) : o;
        }, new FormData());
  }

  protected static toFormParams(record: {[key: string]: string | undefined }): URLSearchParams {
    const params = new URLSearchParams();
    Object.keys(record)
        .forEach((key) => {
          const value = record[key];
          if (value !== undefined) {
            params.append(key, value);
          }
        });
    return params;
  }

  private host: string;

  constructor(host: string) {
    this.host = host;
  }

  public register(params: Partial<IRegisterData>): Promise<Response> {
    const body = AppClient.toFormParams(params);
    return fetch(this.host + "/users", { method: "POST", body: body as any });
  }
}

export interface IRegisterData {
  [key: string]: string;

  mail: string;
  name: string;
  password: string;
  passwordConfirm: string;
}
