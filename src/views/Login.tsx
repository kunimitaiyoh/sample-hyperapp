import { IRouteState } from "@/context";
import { Link } from "@hyperapp/router";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";

export interface ILoginActions {
  login: (state: IRouteState) => ActionResult<IRouteState>;
}

export const loginActions: ILoginActions = {
  login: (state) => undefined,
};

export const LoginView = (actions: ILoginActions) => (
  <div>
    <input name="username" />
    <input type="password" name="password" />
    <button onclick={ actions.login }>ログイン</button>
    <p>または、<Link to="/register">新規登録</Link></p>
  </div>
);
