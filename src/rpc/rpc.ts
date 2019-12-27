import {Initiator} from './lowLevel';
import {Responder} from './lowLevel/responder';
import {RecieverType} from './general';

export class RPC {
	public sender: Initiator = new Initiator();
	public responder?: Responder;
	constructor(public client: any, public channel: any, public type: RecieverType, public group?: number, public defaultTimeout: number = 1000) {}

	send(request: any) {
		request.channel = this.channel;
		request.clientid = this.client;

		request.requesttypedata = this.type;

		if (request.timeout === undefined) {
			request.timeout = this.defaultTimeout;
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
