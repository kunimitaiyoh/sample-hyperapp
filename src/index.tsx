import { IRouteState } from "@/context";
import { HomeView } from "@/views/Home";
import { ILoginActions, loginActions, LoginView } from "@/views/Login";
import { RegisterView } from "@/views/Register";
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
  <section>
    <nav class="ui fixed inverted menu">
      <div class="ui container">
        <a href="/" class="header item">Microservice Architecture</a>
        {/* <a href="#" class="item">設定</a> */}
      </div>
    </nav>
    <div class="ui main container" style={{ paddingTop: "4em" }}>
      <Switch>
        <Route path="/" render={ HomeView } />
        <Route path="/login" render={ LoginView } />
        <Route path="/register" render={ RegisterView } />
        <Route parent path="/article" render={ TopicsView } />
        <Route parent render={ () => <p>Not Found</p> } />
      </Switch>
    </div>
  </section>
);

const main = app(state, routeActions, view, document.body);

const unsubscribe = location.subscribe(main.location);
