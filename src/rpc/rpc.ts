import {Initiator, Responder} from './lowLevel';
import {GrpcClient} from '../lib';
import {Empty, Request, Response, Subscribe} from '../protos/generated';
import {Settings} from "../interfaces";

export class RPC {
	private GRPCConnection = new GrpcClient(this.settings);
	public sender: Initiator = new Initiator(this.GRPCConnection.client);
	public responder?: Responder;
	constructor(private settings: Settings) {}

	close(): void {
		this.GRPCConnection.client.close();
		this.responder?.stop();
	}

	send(request: Request): Promise<Response> {
		request.setChannel(this.settings.channel);
		request.setClientid(this.settings.client);

		request.setRequesttypedata(this.settings.type);

		if (!request.getTimeout()) request.setTimeout(this.settings.defaultTimeout || 1000);

		return this.sender.sendRequest(request);
	}

	subscribe(reqHandler: (...args: any[]) => void, errorHandler: (...args: any[]) => void) {
		this.responder = new Responder(this.GRPCConnection.client);
		let subRequest = new Subscribe();

		// @ts-ignore TODO: 1|2|3|4 < number?
		subRequest.setSubscribetypedata(this.type + 2);
		subRequest.setClientid(this.settings.client);
		subRequest.setChannel(this.settings.channel);
		// @ts-ignore TODO: Type here is weird, not undefined but should be tbh
		subRequest.setGroup(this.settings.group);

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
