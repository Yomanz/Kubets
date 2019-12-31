import {ReceiverType} from "./rpc/general";

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
	Events = 1,
	EventStore = 2
}

 export interface  PubSubSettings {
	 client: string,
	 channel: string,
	 host: string,
	 port: number,
	 cert?: string,
	 group?: string,
	 options?: Options,
	 defaultTimeout?: number
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
