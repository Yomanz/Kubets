import {ReceiverType} from "./rpc/general";

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

export interface Options {
	[key: string]: any // TODO: Find the type for this
}
