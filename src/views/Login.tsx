import { Link } from "@hyperapp/router";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";

export interface ILoginActions {
  submit: (state: {}) => ActionResult<{}>;
}

export const loginActions: ILoginActions = {
  submit: (state) => undefined,
};

export const LoginView = (actions: ILoginActions) => (
  <div class="ui middle aligned center aligned grid">
  <div class="column" style={{ maxWidth: "450px" }}>
    <h2 class="ui teal image header">
      <div class="content">ログイン</div>
    </h2>
    <form class="ui large form">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="mail" placeholder="メールアドレス" />
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="パスワード" />
          </div>
        </div>
        <div class="ui fluid large teal submit button">ログイン</div>
      </div>
      <div class="ui error message"></div>
    </form>
    <div class="ui message">
      または <Link to="/register">新規登録</Link>
    </div>
  </div>
</div>
);
