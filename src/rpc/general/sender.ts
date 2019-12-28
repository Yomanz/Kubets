import {RPC} from "../rpc";
import {ReceiverType} from "./receiver";
import {CommandRequest} from "../lowLevel";
import {Request, Response} from "../../protos";

export class GeneralSender {
	public rpc: RPC;
	constructor(client: string, channel: string, type: ReceiverType, defaultTimeout: number = 1000) {
		this.rpc = new RPC(client, channel, type, undefined,defaultTimeout);
	}

	send(request: Request): Promise<Response> {
		return this.rpc.send(request);
	}
}
