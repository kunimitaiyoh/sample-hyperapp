import { AppClient, IRegisterData } from "@/clients/AppClient";
import { ValidationErrors, Violation } from "@/clients/clients";
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
      return new Promise((resolve) => resolve(actions.update({ isLoading: true, errors: null })))
        .then(() => client.register(state.formData))
        .then<any>((response) => {
          if (response.ok) {
            return location.go("/login");
          } else {
            return response.json().then((body) => actions.update({ isLoading: false, errors: body }));
          }
        })
        .catch((reason) => actions.update({ isLoading: false, errors: reason }));
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

const labels: { [key: string]: string } = {
  mail: "メールアドレス",
  name: "名前",
  password: "パスワード",
  passwordConfirm: "パスワード（確認）",
};

const listErrors = (response: ValidationErrors) => {
  const messageTemplates: { [key: string]: (field: string | null, attrs: { [key: string]: string }) => string } = {
    FieldUnknownError: (field, attrs) => field + "にエラーがあります。",
    NotEmpty: (field, attrs) => field + "の入力が必要です。",
    SamePasswords: (field, attrs) => "パスワードが一致していなければなりません。",
    UnknownError: (field, attrs) => "エラーがあります。",
  };

  return response.errors.map((x) => {
    if (x.type in messageTemplates && x.field !== undefined) {
      return messageTemplates[x.type](labels[x.field], x.attributes);
    } else if (x.field !== undefined) {
      return messageTemplates.FieldUnknownError(labels[x.field], x.attributes);
    } else {
      return messageTemplates.UnknownError(null, x.attributes);
    }
  });
};

export const RegisterView = ({ state, actions }: { state: IRegisterState, actions: IRegisterActions }) => {
  const edit = (patch: Partial<IRegisterData>) => actions.update({ formData: Object.assign(state.formData, patch) });

  const errorDictionary: Set<string> = (() => {
    if (state.errors !== null) {
      return state.errors.errors.reduce((prev, current) => {
        if (current.field !== undefined) {
          prev.add(current.field);
        }
        return prev;
      }, new Set<string>());
    } else {
      return new Set<string>();
    }
  })();
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
      <div class={ classNames("field", { error: errorDictionary.has("mail") }) }>
        <label>メールアドレス</label>
        <input type="text" placeholder="foo@example.com"
          value={ state.formData.mail }
          oninput={ (e: InputEvent ) => edit({ mail: e.target.value }) }
          oncreate={ (e: HTMLInputElement) => e.focus()} />
      </div>
      <div class={ classNames("field", { error: errorDictionary.has("name") }) }>
        <label>名前</label>
        <input type="text" placeholder="名前"
          value={ state.formData.name }
          oninput={ (e: InputEvent ) => edit({ name: e.target.value }) } />
      </div>
      <div class={ classNames("field", { error: errorDictionary.has("password") }) }>
        <label>パスワード</label>
        <input type="password" placeholder="パスワード"
          value={ state.formData.password }
          oninput={ (e: InputEvent ) => edit({ password: e.target.value }) } />
      </div>
      <div class={ classNames("field", { error: errorDictionary.has("passwordConfirm") }) }>
        <label>パスワード（確認）</label>
        <input type="password" placeholder="パスワード（確認）"
          value={ state.formData.passwordConfirm }
          oninput={ (e: InputEvent ) => edit({ passwordConfirm: e.target.value }) } />
      </div>
      <button class="ui submit button" onclick={ actions.submit }>登録</button>
    </div>
  );
};
