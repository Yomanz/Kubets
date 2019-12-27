import {RPC} from "../rpc";

export enum RecieverType {
	Commands= 1,
	Query
}

export class GeneralReciever {
	public rpc: RPC;
	constructor(client: string, channel: string, type: RecieverType, group?: any) {
		this.rpc = new RPC(client, channel, type, group,1000);
	}

	subscribe(reqHandler: Function, errorHandler: Function) {
		this.rpc.subscribe(reqHandler, errorHandler);
	}

	unsubscribe() {
		this.rpc.unsubscribe();
	}

	sendResponse(response: any) {
		return this.rpc.sendResponse(response);
	}
}
