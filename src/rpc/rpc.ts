import {CommandRequest, Initiator} from './lowLevel';
import {Responder} from './lowLevel';
import {ReceiverType} from './general';
import {GrpcClient} from "../lib";
import {Request, Response, Subscribe} from "../protos/generated";

export class RPC {
	private GRPCConnection = new GrpcClient();
	public sender: Initiator = new Initiator(this.GRPCConnection.client);
	public responder?: Responder;
	constructor(public client: any, public channel: any, public type: ReceiverType, public group?: string, public defaultTimeout: number = 1000) {}

	send(request: Request) {
		request.setChannel(this.channel);
		request.setClientid(this.client);

		request.setRequesttypedata(this.type);

		if (!request.getTimeout()) request.setTimeout(this.defaultTimeout);

		return this.sender.sendRequest(request);
	}

	subscribe(reqHandler: (...args: any[]) => void, errorHandler: (...args: any[]) => void) {
		this.responder = new Responder(this.GRPCConnection.client);
		let subRequest = new Subscribe();

		// @ts-ignore TODO: 1|2|3|4 < number?
		subRequest.setSubscribetypedata(this.type + 2);
		subRequest.setClientid(this.client);
		subRequest.setChannel(this.channel);
		// @ts-ignore TODO: Type here is weird, not undefined but should be tbh
		subRequest.setGroup(this.group);

		this.responder.subscribeToRequests(subRequest, reqHandler, errorHandler);
	}

	unsubscribe() {
		if (this.responder) this.responder.stop();
	}

	sendResponse(response: Response) {
		if (!this.responder) throw new Error(`Responder not active`); // TODO: Clarify

		response.setClientid(this.client);
		return this.responder.sendResponse(response);
	}
}
