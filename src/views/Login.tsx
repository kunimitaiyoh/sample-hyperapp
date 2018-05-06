import { IRouteState } from "@/context";
import { Link } from "@hyperapp/router";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";

export interface ILoginActions {
  submit: (state: IRouteState) => ActionResult<IRouteState>;
}

export const loginActions: ILoginActions = {
  submit: (state) => undefined,
};

export const LoginView = (actions: ILoginActions) => (
  <div>
    <h2>Login</h2>
    <input name="username" />
    <input type="password" name="password" />
    <button onclick={ actions.submit }>ログイン</button>
    <p>または、<Link to="/register">新規登録</Link></p>
  </div>
);
