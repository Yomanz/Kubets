import {RPC} from "../rpc";
import {ReceiverType} from "./receiver";
import {CommandRequest} from "../lowLevel";
import {Request, Response} from "../../protos";
import {Settings} from "../../interfaces";

export class GeneralSender {
	public rpc: RPC;
	constructor(private settings: Settings) {
		this.rpc = new RPC(this.settings);
	}

	send(request: Request): Promise<Response> {
		return this.rpc.send(request);
	}
}
