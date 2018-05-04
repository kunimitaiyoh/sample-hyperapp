import { h, app, View } from 'hyperapp';
import { state, State } from '@/state';
import { actions, Actions } from '@/actions';

export const view: View<State, Actions> = (state, actions) => (
  <div>
    <h1>{state.count}</h1>
    <button onclick={() => actions.down(1)}>-</button>
    <button onclick={() => actions.up(1)}>+</button>
  </div>
);
