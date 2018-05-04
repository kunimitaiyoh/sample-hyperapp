import { actions, IActions } from "@/actions";
import { IState, state } from "@/state";
import { view } from "@/view";
import { app, h } from "hyperapp";

app<IState, IActions>(state, actions, view, document.body);
