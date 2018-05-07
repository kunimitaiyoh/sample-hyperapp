export class AccessToken {
  public body: string;

  public constructor(data: any) {
    this.body = data.access_token as string;
  }
}
