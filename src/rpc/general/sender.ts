import {RPC} from "../rpc";
import {RecieverType} from "./reciever";

export class GeneralSender {
	public rpc: RPC;
	constructor(client: string, channel: string, type: RecieverType, defaultTimeout: number = 1000) {
		this.rpc = new RPC(client, channel, type, undefined,defaultTimeout);
	}
}
