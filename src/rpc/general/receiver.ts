import {RPC} from "../rpc";
import {Request, Response} from "../../protos";

export enum ReceiverType {
	Commands = 1,
	Query = 2
}

export class GeneralReceiver {
	public rpc: RPC;
	constructor(client: string, channel: string, type: ReceiverType, group?: string, defaultTimeout: number = 1000) {
		this.rpc = new RPC(client, channel, type, group, defaultTimeout);
	}

	subscribe(reqHandler: (...args: any[]) => void, errorHandler: (...args: any[]) => void) {
		this.rpc.subscribe(reqHandler, errorHandler);
	}

	unsubscribe() {
		this.rpc.unsubscribe();
	}

	sendResponse(response: Response) {
		return this.rpc.sendResponse(response);
	}

	ack(req: Request) {}
}
