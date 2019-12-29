import {PubSub} from "../pubsub";
import {Settings} from "../../interfaces";
import {kubemqClient, Request, Subscribe} from "../../protos/generated";
import {ClientReadableStream} from "grpc";

export class Taker {
	public join?: ClientReadableStream<Request>;

	constructor(public client: kubemqClient) {}

	subscribeToEvents(subscribeRequest: Subscribe, reqHandler: (...args: any[]) => void, errorHandler: (...args: any[]) => void){
		this.join = this.client.subscribeToRequests(subscribeRequest);

		this.join.on('error', errorHandler);
		this.join.on('data', reqHandler);

		this.stop = this.stop.bind(this);
	}

	stop() {
		console.log('Stop was called');
		this.join?.cancel();
	}
}
