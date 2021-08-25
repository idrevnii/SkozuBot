import { TelegrafContext } from "telegraf/typings/context";

export interface IContext extends TelegrafContext {
  state: IState;
}

export interface IState {
  args?: string[];
}
