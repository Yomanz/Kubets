import {CommandRequest, Initiator} from './lowLevel';
import {Responder} from './lowLevel';
import {RecieverType} from './general';

export class RPC {
	public sender: Initiator = new Initiator();
	public responder?: Responder;
	constructor(public client: any, public channel: any, public type: RecieverType, public group?: string, public defaultTimeout: number = 1000) {}

	send(request: any) {
		request.Channel = this.channel;
		request.ClientID = this.client;

		request.RequestTypeData = this.type;

		if (!request.Timeout) {
			request.Timeout = this.defaultTimeout;
		}

		return this.sender.sendRequest(request);
	}

	subscribe(reqHandler: Function, errorHandler: Function) {
		this.responder = new Responder();
		let subRequest = {
			SubscribeTypeData: this.type + 2,
			ClientID: this.client,
			Channel: this.channel,
			Group: this.group
		};
		this.responder.subscribeToRequests(subRequest, reqHandler, errorHandler);
	}

	unsubscribe() {
		if (this.responder) this.responder.stop();

	}

	sendResponse(response: any) {
		if (!this.responder) throw new Error(`Responder not active`); // TODO: Clarify

		response.ClientID = this.client;
		return this.responder.sendResponse(response);
	}
}
