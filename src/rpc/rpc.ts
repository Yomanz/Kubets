import {Initiator, Responder} from './lowLevel';
import {GrpcClient} from '../lib';
import {Empty, Request, Response, Subscribe} from '../protos/generated';
import {Settings} from "../interfaces";

export class RPC extends GrpcClient {
	public initiator: Initiator = new Initiator(this.client);
	public responder?: Responder;
	constructor(settings: Settings) { super(settings) }

	close(): void {
		this.client.close();
		this.responder?.stop();
	}

	send(request: Request): Promise<Response> {
		request.setChannel(this.settings.channel);
		request.setClientid(this.settings.client);

		request.setRequesttypedata(this.settings.type);

		if (!request.getTimeout()) request.setTimeout(this.settings.defaultTimeout || 1000);

		return this.initiator.sendRequest(request);
	}

	subscribe(reqHandler: (...args: any[]) => void, errorHandler: (...args: any[]) => void) {
		this.responder = new Responder(this.client);
		let subRequest = new Subscribe();

		// @ts-ignore TODO: 1|2|3|4 < number?
		subRequest.setSubscribetypedata(this.settings.type + 2);
		subRequest.setClientid(this.settings.client);
		subRequest.setChannel(this.settings.channel);
		subRequest.setGroup(this.settings.group || '');

		this.responder.subscribeToRequests(subRequest, reqHandler, errorHandler);
	}

	unsubscribe() {
		if (this.responder) this.responder.stop();
	}

	async sendResponse(response: Response): Promise<Empty> {
		if (!this.responder) throw new Error(`Responder not active`); // TODO: Clarify

		response.setClientid(this.settings.client);
		return this.responder.sendResponse(response);
	}
}
