import { IRegisterState } from "@/views/Register";
import { ActionResult } from "hyperapp";

export type Action<State, Actions> = (state: State, actions: Actions) => ActionResult<IRegisterState>;
