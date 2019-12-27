import {RPC, Type} from "../rpc";

export class CommandReciever {
	public rpc: RPC;
	constructor(client: string, channel: string, group?: any) {
		this.rpc = new RPC(client, channel, Type.Commands, group,1000);
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
