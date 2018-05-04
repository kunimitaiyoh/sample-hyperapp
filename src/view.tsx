import { IActions } from "@/actions";
import { IState } from "@/state";
import { app, h, View } from "hyperapp";

export const view: View<IState, IActions> = (state, actions) => (
  <div>
    <h1>{state.count}</h1>
    <button onclick={() => actions.down(1)}>-</button>
    <button onclick={() => actions.up(1)}>+</button>
  </div>
);
