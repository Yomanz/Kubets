export enum ReceiverType {
	Commands = 1,
	Query = 2
}

export enum EventStoreType {
	Undefined,
	StartNewOnly,
	StartFromFirst,
	StartFromLast,
	StartAtSequence,
	StartAtTime,
	StartAtTimeDelta,
}

export enum SubscribeType {
	SubscribeTypeUndefined,
	Events,
	EventsStore
}

export interface  PubSubSettings {
	 client: string,
	 channel: string,
	 host: string,
	 port: number,
	 cert?: string,
	 group?: string,
	 type?: SubscribeType,
	 options?: Options,
	 defaultTimeout?: number
}

export interface QueueSettings {
	queue: string,
	client: string,
	maxNumberOfMessage?: number,
	waitTime: number,
	host: string,
	port: number,
	cert?: string,
	options?: Options
}

export interface Settings {
	client: string,
	channel: string,
	type: ReceiverType,
	host: string,
	port: number,
	cert?: string,
	group?: string,
	options?: Options,
	defaultTimeout?: number
}

export interface StoreProperties {
	Eventsstoretypedata: EventStoreType,
	Eventsstoretypevalue: number
}

export interface Options {
	[key: string]: any // TODO: Find the type for this
}
