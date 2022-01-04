export interface Task {
  type: "humoresque";
  chatId: number;
  args?: number[];
}

export interface TaskResult {
  type: "humoresque";
  chatId: number;
  args?: number[];
  humoresques?: string[][];
}
