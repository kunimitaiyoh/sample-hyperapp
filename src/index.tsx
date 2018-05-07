import { AppClient } from "@/clients/AppClient";
import { HomeView } from "@/views/Home";
import { ILoginActions, loginActions, LoginView } from "@/views/Login";
import {
  IRegisterActions,
  IRegisterState,
  registerActions,
  registerState,
  RegisterView,
} from "@/views/Register";
import {
  Link,
  location,
  LocationActions,
  LocationState,
  Redirect,
  RenderProps,
  Route,
  Switch,
} from "@hyperapp/router";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";

declare const API_HOST: string;
const host = API_HOST;

const client = new AppClient(host);

const About = () => <h2>About</h2>;
const Topic = ({ match }: RenderProps<ITopicParams>) => <h3>{match.params.topicId}</h3>;

const TopicsView = ({ match }: RenderProps<ITopicParams>) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/single-state-tree`}>Single State Tree</Link>
      </li>
      <li>
        <Link to={`${match.url}/routing`}>Routing</Link>
      </li>
    </ul>

    {match.isExact && <h3>Please select a topic.</h3>}

    <Route parent path={`${match.path}/:topicId`} render={Topic} />
  </div>
);

interface ITopicParams {
  topicId: string;
}

export interface IRouteActions {
  location: LocationActions;
  login: ILoginActions;
  register: IRegisterActions;
}

const routeActions: ActionsType<IRouteState, IRouteActions> = {
  location: location.actions,

  login: loginActions(location.actions, client),
  register: registerActions(location.actions, client),
};

export interface IRouteState {
  location: LocationState;
  register: IRegisterState;
}

const state: IRouteState = {
  location: location.state,
  register: (registerState),
};

const view: View<IRouteState, IRouteActions> = (s: IRouteState, a: IRouteActions) => (
  <section>
    <nav class="ui fixed inverted menu">
      <div class="ui container">
        <a href="/" class="header item">Microservice Architecture</a>
      </div>
    </nav>
    <div class="ui main container" style={{ paddingTop: "4em" }}>
      <Switch>
        <Route path="/" render={ HomeView } />
        <Route path="/login" render={ LoginView } />
        <Route path="/register"
            render={ () => <RegisterView state={ s.register } actions={ a.register } /> } />
        <Route parent path="/article" render={ TopicsView } />
        <Route parent render={ () => <p>Not Found</p> } />
      </Switch>
    </div>
  </section>
);

const main = app(state, routeActions, view, document.body);

const unsubscribe = location.subscribe(main.location);
