import { IRouteState } from "@/context";
import { Link } from "@hyperapp/router";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";

export interface IRegisterActions {
  submit: (state: IRouteState) => ActionResult<IRouteState>;
}

export const RegisterActions: IRegisterActions = {
  submit: (state) => undefined,
};

export const RegisterView = (actions: IRegisterActions) => (
  <div>
    <h2>Register</h2>
    <input name="mail" />
    <input name="name" />
    <input type="password" name="password" />
    <input type="password" name="passwordConfirm" />
    <button onclick={ actions.submit }>登録</button>
  </div>
);
