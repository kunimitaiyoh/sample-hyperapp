import { AppClient, IArticleResponse } from "@/clients/AppClient";
import { Action } from "@/types";
import { Link, LocationActions } from "@hyperapp/router";
import { ActionResult, ActionsType, app, h, View } from "hyperapp";

export interface IArticleActions {
  find: (id: number) => Action<IArticleState, IArticleActions>;
  update: (state: Partial<IArticleState>) => Action<IArticleState, IArticleActions>;
}

export const articleActions: (location: LocationActions, client: AppClient) => IArticleActions =
  (location, client) => ({
    find: (id) => async (state, actions) => {
      return client.findArticle(id)
        .then((response) => actions.update({ subject: response }));
    },
    update: (changed) => (state) => changed,
  });

export interface IArticleState {
  subject: IArticleResponse | null;
}

export const articleState: IArticleState = {
  subject: null,
};

export const ArticleView = ({ state, actions }: { state: IArticleState, actions: IArticleActions }) => (
  <div oncreate={ () => actions.find(1) } >
    <h2>Article</h2>
    {
      () => {
        if (state.subject !== null) {
          const article = state.subject.article;
          return (
            <div>
              <div>{ article.title }</div>
              <div>{ article.body }</div>
              <div>{ article.userId }</div>
            </div>
          );
        } else {
          return;
        }
      }
    }
  </div>
);
