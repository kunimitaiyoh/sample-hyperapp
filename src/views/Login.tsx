import { AppClient, ILoginData } from "@/clients/AppClient";
import { InputEvent } from "@/InputEvent";
import { Action } from "@/types";
import { Link, LocationActions } from "@hyperapp/router";
import classNames from "classnames";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";

export interface ILoginActions {
  submit: () => Action<ILoginState, ILoginActions>;
  update: (state: Partial<ILoginState>) => Action<ILoginState, ILoginActions>;
}

export const loginActions: (location: LocationActions, client: AppClient) => ILoginActions =
  (location, client) => ({
    submit: () => async (state, actions) => {
      return new Promise((resolve) => resolve(actions.update({ isLoading: true, isError: false })))
        .then(() => client.authenticate(state.formData))
        .then((succeed) => {
          if (succeed) {
            return location.go("/home");
          } else {
            return actions.update({ isLoading: false, isError: true });
          }
        });
    },
    update: (changed) => (state, actions) => changed,
  });

export interface ILoginState {
  formData: Partial<ILoginData>;
  isError: boolean;
  isLoading: boolean;
}

export const loginState: ILoginState = {
  formData:  {
  },
  isError: false,
  isLoading: false,
};

export const LoginView = ({ state, actions }: { state: ILoginState, actions: ILoginActions }) => (
  <div class={ classNames("ui middle aligned center aligned grid", { loading: state.isLoading }) }>
  <div class="column" style={{ maxWidth: "450px" }}>
    <h2 class="ui teal image header">
      <div class="content">ログイン</div>
    </h2>
    <form class={ classNames("ui large form", { loading: state.isLoading }) }>
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" placeholder="メールアドレス"
              value={ state.formData.username }
              oninput={ (e: InputEvent ) =>
                ({ formData: Object.assign(state.formData, { username: e.target.value }) }) }
              oncreate={ (e: HTMLInputElement) => e.focus() } />
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" placeholder="パスワード"
              value={ state.formData.password }
              oninput={ (e: InputEvent ) =>
                ({ formData: Object.assign(state.formData, { password: e.target.value }) }) }
              oncreate={ (e: HTMLInputElement) => e.focus() } />
          </div>
        </div>
        <div class="ui fluid large teal submit button"
          onclick={ actions.submit }>ログイン</div>
      </div>
      <div class="ui error message"></div>
    </form>
    <div class="ui message">
      または <Link to="/register">新規登録</Link>
    </div>
  </div>
</div>
);
