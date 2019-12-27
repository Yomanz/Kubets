import {RPC} from "../rpc";
import {RecieverType} from "./receiver";
import {CommandRequest} from "../lowLevel";

export class GeneralSender {
	public rpc: RPC;
	constructor(client: string, channel: string, type: RecieverType, defaultTimeout: number = 1000) {
		this.rpc = new RPC(client, channel, type, undefined,defaultTimeout);
	}

	send(request: CommandRequest) {
		return this.rpc.send(request);
	}
}
