export interface ITask {
  type: "humoresque";
  chatId: number;
  args?: number[];
}

export interface IHumoresquesResult {
  type: "humoresque";
  chatId: number;
  humoresques: string[];
  args: number[];
}
