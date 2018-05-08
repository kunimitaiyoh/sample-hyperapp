import { AppClient, IArticle } from "@/clients/AppClient";
import { Action } from "@/types";
import { Link } from "@hyperapp/router";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";

export interface IHomeActions {
  searchUserArticles: () => Action<IHomeState, IHomeActions>;
  update: (state: Partial<IHomeState>) => Action<IHomeState, IHomeActions>;
}

export const homeActions: (client: AppClient) => IHomeActions =
  (client) => ({
    searchUserArticles: () => async (state, actions) => {
      return client.searchUserArticles()
        .then((response) => actions.update({ subject: response }));
    },
    update: (changed) => (state) => changed,
  });

export interface IHomeState {
  subject: { articles: IArticle[] } | null;
}

export const homeState: IHomeState = {
  subject: null,
};

export const HomeView = ({ state, actions }: { state: IHomeState, actions: IHomeActions }) => (
  <div oncreate={ actions.searchUserArticles }>
    <h2>Home</h2>
    {
      () => {
        if (state.subject !== null) {
          const articles = state.subject.articles;
          return (articles.length > 0) ?
            <table>
              <tr>
                <td>title</td>
                <td>body</td>
                <td>created</td>
              </tr>
              {
                articles.map((article) => (
                  <tr>
                    <td>{ article.title }</td>
                    <td>{ article.body }</td>
                    <td>{ article.created }</td>
                  </tr>
                ))
              }
            </table>
          :
          (<p>No articles.</p>);
        }
      }
    }
    <table></table>
  </div>
);
