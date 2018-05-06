import { IRouteState } from "@/context";
import { ILoginActions, loginActions, LoginView } from "@/views/Login";
import {
  Link,
  location,
  LocationActions,
  LocationState,
  RenderProps,
  Route,
  Switch,
} from "@hyperapp/router";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";

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

interface IRouteActions {
  location: LocationActions;
  loginActions: ILoginActions;
}

const routeActions: ActionsType<IRouteState, IRouteActions> = {
  location: location.actions,
  loginActions: (loginActions),
};

const state: IRouteState = {
  location: location.state,
};

const view: View<IRouteState, IRouteActions> = (s: IRouteState, a: IRouteActions) => (
  <Switch>
    <Route path="/" render={ LoginView } />
    {/* <Route path="/register" render={ Register } /> */}
    <Route parent path="/topics" render={ TopicsView } />
  </Switch>
);

const main = app(state, routeActions, view, document.body);

const unsubscribe = location.subscribe(main.location);
