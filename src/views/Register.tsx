import { Link } from "@hyperapp/router";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";

export interface IRegisterActions {
  submit: (state: IRegisterState) => ActionResult<IRegisterState>;
  update: (state: Partial<IRegisterState>) => ActionResult<IRegisterState>;
}

export const RegisterActions: IRegisterActions = {
  submit: (state) => null,
  update: (state) => state,
};

export interface IRegisterState {
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

export const RegisterView = (state: IRegisterState, actions: IRegisterActions) => (
  <div class="ui form">
    <div class="field">
      <label>メールアドレス</label>
      <input type="text" name="mail" placeholder="foo@example.com"
          value={ state.mail }
          oninput={ (e: HTMLInputElement) => actions.update({ mail: e.value }) }
          oncreate={ (e: HTMLInputElement) => e.focus()} />
      <div>{ state.mail }</div>
    </div>
    <div class="field">
      <label>名前</label>
      <input type="text" name="name" placeholder="名前" />
    </div>
    <div class="field">
      <label>パスワード</label>
      <input type="password" name="password" placeholder="パスワード" />
    </div>
    <div class="field">
      <label>パスワード（確認）</label>
      <input type="text" name="passwordConfirm" placeholder="パスワード（確認）" />
    </div>
    <button class="ui submit button" onclick={ actions.submit }>登録</button>
  </div>
);
