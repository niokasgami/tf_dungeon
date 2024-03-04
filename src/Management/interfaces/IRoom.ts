

export interface IEvent {
  background: string;
  music: string;
  rooms: IRoom[];
}
export interface IRoom {
  dialogue?: string;
  choices?: IEventChoice[]
  label?: string;
  actions?: IEventAction[];
  branching?: IEventBranching[];
}

export interface IEventChoice {
  name: string,
  jump?: string,
  goto?: string,
  conditions?: IChoiceCondition[];
}

export interface IChoiceCondition {
  condition: string;
  args: any[];
}

export interface IEventAction {
  action: string;
  args: any[];
}

export interface IEventBranching {
  conditions: IChoiceCondition[] | string;
  goto?: string;
  jump?: string;
}