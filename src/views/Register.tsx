import { AppClient, IRegisterData } from "@/clients/AppClient";
import { ValidationErrors } from "@/clients/clients";
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
        .then<any>((response) => {
          if (response.ok) {
            return location.go("/login");
          } else {
            return response.json().then((body) => actions.update({ isLoading: false, errors: body.errors }));
          }
        })
        .catch((reason) => actions.update({ isLoading: false, errors: reason.errors }));
    },
    update: (changed) => (state) => changed,
  });

export interface IRegisterState {
  errors: ValidationErrors | null;
  formData: Partial<IRegisterData>;
  isLoading: boolean;
}

export const registerState: IRegisterState = {
  errors: null,
  formData:  {
  },
  isLoading: false,
};

const listErrors = (errors: ValidationErrors) => {
  const fields = Object.keys(errors.fields)
    .map((x) => errors.fields[x].map((y) => y.message))
    .reduce((prev, current) => prev.concat(current), []);

  return errors.general.map((v) => v.message)
    .concat(fields);
};

export const RegisterView = ({ state, actions }: { state: IRegisterState, actions: IRegisterActions }) => {
  const edit = (patch: Partial<IRegisterData>) => actions.update({ formData: Object.assign(state.formData, patch) });

  return (
    <div class={ classNames("ui form", { loading: state.isLoading, error: state.errors !== null }) }>
      {
        (() => {
          if (state.errors !== null) {
            return (
              <div class="ui error message">
                <div class="header">エラー</div>
                <ul>
                  {
                    listErrors(state.errors)
                      .map((message) => (<li>{ message }</li>))
                  }
                </ul>
              </div>
            );
          }
        })()
      }
      <div class={ classNames("field", { error: state.errors !== null && "mail" in state.errors.fields }) }>
        <label>メールアドレス</label>
        <input type="text" placeholder="foo@example.com"
          value={ state.formData.mail }
          oninput={ (e: InputEvent ) => edit({ mail: e.target.value }) }
          oncreate={ (e: HTMLInputElement) => e.focus()} />
      </div>
      <div class={ classNames("field", { error: state.errors !== null && "name" in state.errors.fields }) }>
        <label>名前</label>
        <input type="text" placeholder="名前"
          value={ state.formData.name }
          oninput={ (e: InputEvent ) => edit({ name: e.target.value }) } />
      </div>
      <div class={ classNames("field", { error: state.errors !== null && "password" in state.errors.fields }) }>
        <label>パスワード</label>
        <input type="password" placeholder="パスワード"
          value={ state.formData.password }
          oninput={ (e: InputEvent ) => edit({ password: e.target.value }) } />
      </div>
      <div class={ classNames("field", { error: state.errors !== null && "passwordConfirm" in state.errors.fields }) }>
        <label>パスワード（確認）</label>
        <input type="password" placeholder="パスワード（確認）"
          value={ state.formData.passwordConfirm }
          oninput={ (e: InputEvent ) => edit({ passwordConfirm: e.target.value }) } />
      </div>
      <button class="ui submit button" onclick={ actions.submit }>登録</button>
    </div>
  );
};
