import { AccessToken } from "@/clients/AccessToken";
import { IRegisterState } from "@/views/Register";

const Keys = {
  ACCESS_TOKEN: "AccessToken",
};

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

  get accessToken(): AccessToken | null {
    const data = localStorage.getItem(Keys.ACCESS_TOKEN);
    return (data !== null) ? JSON.parse(data) as AccessToken : null;
  }

  set accessToken(data: AccessToken | null) {
    if (data !== null) {
      localStorage.setItem(Keys.ACCESS_TOKEN, JSON.stringify(data));
    } else {
      localStorage.removeItem(Keys.ACCESS_TOKEN);
    }
  }

  constructor(host: string) {
    this.host = host;
  }

  public register(params: Partial<IRegisterData>): Promise<Response> {
    const body = AppClient.toFormParams(params);
    return fetch(this.host + "/users", { method: "POST", body: body as any });
  }

  public async authenticate(params: Partial<ILoginData>): Promise<boolean> {
    const body = AppClient.toFormParams(params);
    body.append("grant_type", "password");
    return fetch(this.host + "/oauth2/token", { method: "POST", body: body as any })
      .then((response) => response.json().then((json) => response.ok ? json : Promise.reject(json)))
      .then((data) => {
        const token = new AccessToken(data);
        this.accessToken = token;
        return true;
      }).catch((reason) => false);
  }

  public async findArticle(id: number): Promise<IArticleResponse> {
    if (this.accessToken !== null) {
      const options: RequestInit = {
        headers: { Authorization: "Bearer " + this.accessToken.body },
        method: "GET",
        mode: "cors",
      };
      return fetch(this.host + "/articles/" + id, options)
        .then((response) => response.json().then((json) => response.ok ? json : Promise.reject(json)));
    } else {
      throw new TypeError();
    }
  }
}

export interface IRegisterData {
  [key: string]: string;

  mail: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IArticleResponse {
  article: IArticle;
}

export interface IArticle {
  id: number;
  userId: number;
  title: string;
  body: string;
  created: string;
}
