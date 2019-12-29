import {RPC} from "../rpc";
import {Empty, Request, Response} from "../../protos";
import {Settings} from "../../interfaces";

export enum ReceiverType {
	Commands = 1,
	Query = 2
}

export class GeneralReceiver {
	public rpc: RPC;
	constructor(private settings: Settings) {
		this.rpc = new RPC(this.settings);
	}

	subscribe(reqHandler: (...args: any[]) => void, errorHandler: (...args: any[]) => void) {
		this.rpc.subscribe(reqHandler, errorHandler);
	}

	unsubscribe() {
		this.rpc.unsubscribe();
	}

	async sendResponse(response: Response): Promise<Empty> {
		return this.rpc.sendResponse(response);
	}

	async ack(cmd: Request, res: Response = new Response()): Promise<Empty> {
		res.setRequestid(cmd.getRequestid());
		res.setReplychannel(cmd.getReplychannel());

		return this.sendResponse(res)
	}
}
