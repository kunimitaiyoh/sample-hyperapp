import { InputEvent } from "@/InputEvent";
import { Link } from "@hyperapp/router";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";
import { IRouteState } from "..";

export interface IRegisterActions {
  submit: () => ActionResult<IRouteState>;
  update: (changed: Partial<IRegisterState>) => (state: IRouteState) => ActionResult<IRegisterState>;
}

export const registerActions: IRegisterActions = {
  submit: () => null,
  update: (changed) => (state) => changed,
};

export interface IRegisterState {
  [i: string]: string;

  mail: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

export const registerState: IRegisterState = {
  mail: "",
  name: "",
  password: "",
  passwordConfirm: "",
};

export const RegisterView = ({ state, actions }: { state: IRegisterState, actions: IRegisterActions }) => (
  <div class="ui form">
    <div class="field">
      <label>メールアドレス</label>
      <input type="text" placeholder="foo@example.com"
          // value={ state.mail }
          oninput={ (e: InputEvent ) => actions.update({ mail: e.target.value }) }
          oncreate={ (e: HTMLInputElement) => e.focus()} />
      <div>{ state.mail }</div>
    </div>
    <div class="field">
      <label>名前</label>
      <input type="text" placeholder="名前"
          oninput={ (e: InputEvent ) => actions.update({ name: e.target.value }) } />
    </div>
    <div class="field">
      <label>パスワード</label>
      <input type="password" name="password" placeholder="パスワード"
        oninput={ (e: InputEvent ) => actions.update({ password: e.target.value }) } />
    </div>
    <div class="field">
      <label>パスワード（確認）</label>
      <input type="text" name="passwordConfirm" placeholder="パスワード（確認）"
        oninput={ (e: InputEvent ) => actions.update({ passwordConfirm: e.target.value }) } />
    </div>
    <button class="ui submit button" onclick={ actions.submit }>登録</button>
  </div>
);
