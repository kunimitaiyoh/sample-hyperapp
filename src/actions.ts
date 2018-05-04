import { IState } from "@/state";
import { ActionResult, ActionsType } from "hyperapp";

export interface IActions {
  down: (value: number) => (state: IState) => ActionResult<IState>;
  up: (value: number) => (state: IState) => ActionResult<IState>;
}

export const actions: ActionsType<IState, IActions> = {
  down: (value: number) => (state) => {
    return { count: state.count - value };
  },

  up: (value: number) => (state) => {
    return { count: state.count + value };
  },
};
