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

export const RegisterView = ({ state, actions }: { state: IRegisterState, actions: IRegisterActions }) => {
  const edit = (patch: Partial<IRegisterData>) => actions.update({ formData: Object.assign(state.formData, patch) });

  return (
    <div class={ classNames({ ui: true, form: true, loading: state.isLoading, error: state.isError }) }>
      <div class="ui error message">
        <div class="header">エラー</div>
        <p>入力された項目にエラーがあります。</p>
      </div>
      <div class="field">
        <label>メールアドレス</label>
        <input type="text" placeholder="foo@example.com"
          value={ state.formData.mail }
          oninput={ (e: InputEvent ) => edit({ mail: e.target.value }) }
          oncreate={ (e: HTMLInputElement) => e.focus()} />
      </div>
      <div class="field">
        <label>名前</label>
        <input type="text" placeholder="名前"
          value={ state.formData.name }
          oninput={ (e: InputEvent ) => edit({ name: e.target.value }) } />
      </div>
      <div class="field">
        <label>パスワード</label>
        <input type="password" placeholder="パスワード"
          value={ state.formData.password }
          oninput={ (e: InputEvent ) => edit({ password: e.target.value }) } />
      </div>
      <div class="field">
        <label>パスワード（確認）</label>
        <input type="text" placeholder="パスワード（確認）"
          value={ state.formData.passwordConfirm }
          oninput={ (e: InputEvent ) => edit({ passwordConfirm: e.target.value }) } />
      </div>
      <button class="ui submit button" onclick={ actions.submit }>登録</button>
    </div>
  );
};
