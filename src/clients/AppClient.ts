import { IRegisterState } from "@/views/Register";

export class AppClient {
  protected static toFormData(record: {[key: string]: string}): FormData {
    return Object.keys(record)
        .reduce((o, key) => (o.set(key, record[key]), o), new FormData());
  }

  private host: string;

  constructor(host: string) {
    this.host = host;
  }

  public register(params: IRegisterState): Promise<Response> {
    const body = AppClient.toFormData(params);
    return fetch(this.host + "/users/register", { method: "POST", body });
  }

  // public login(params: {}): Promise<Response> {
  // }
}
