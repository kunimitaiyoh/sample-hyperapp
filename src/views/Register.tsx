import { AppClient, IRegisterData } from "@/clients/AppClient";
import { IRouteActions, IRouteState } from "@/index";
import { InputEvent } from "@/InputEvent";
import { Link, LocationActions } from "@hyperapp/router";
import classNames from "classnames";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";

export interface IRegisterActions {
  submit: () => (state: IRegisterState, actions: IRegisterActions) => ActionResult<IRegisterState>;
  update: (changed: Partial<IRegisterState>) => (state: IRegisterState) => ActionResult<IRegisterState>;
}

export const registerActions: (location: LocationActions, client: AppClient) => IRegisterActions =
  (location, client) => ({
    submit: () => async (state, actions) => {
      return new Promise((resolve) => resolve(actions.update({ isLoading: true })))
        .then(() => client.register(state.formData))
        .then((response) => response.ok ? location.go("/login") : actions.update({ isLoading: false, isError: true }));
    },
    update: (changed) => (state) => changed,
  });

export interface IRegisterState {
  formData: Partial<IRegisterData>;
  isError: boolean;
  isLoading: boolean;
}

export const registerState: IRegisterState = {
  formData:  {
    mail: "",
    name: "",
    password: "",
    passwordConfirm: "",
  },
  isError: false,
  isLoading: false,
};

export const RegisterView = ({ state, acts }: { state: IRegisterState, acts: IRegisterActions }) => (
  <div class={ classNames({ ui: true, form: true, loading: state.isLoading, error: state.isError }) }>
    <div class="ui error message">
      <div class="header">エラー</div>
      <p>入力された項目にエラーがあります。</p>
    </div>
    <div class="field">
      <label>メールアドレス</label>
      <input type="text" placeholder="foo@example.com"
          // value={ state.mail }
          oninput={ (e: InputEvent ) => acts.update({ formData: { mail: e.target.value } }) }
          oncreate={ (e: HTMLInputElement) => e.focus()} />
    </div>
    <div class="field">
      <label>名前</label>
      <input type="text" placeholder="名前"
          oninput={ (e: InputEvent ) => acts.update({ formData: { name: e.target.value } }) } />
    </div>
    <div class="field">
      <label>パスワード</label>
      <input type="password" name="password" placeholder="パスワード"
        oninput={ (e: InputEvent ) => acts.update({ formData: { password: e.target.value } }) } />
    </div>
    <div class="field">
      <label>パスワード（確認）</label>
      <input type="text" name="passwordConfirm" placeholder="パスワード（確認）"
        oninput={ (e: InputEvent ) => acts.update({ formData: { passwordConfirm: e.target.value } }) } />
    </div>
    <button class="ui submit button" onclick={ acts.submit }>登録</button>
  </div>
);
