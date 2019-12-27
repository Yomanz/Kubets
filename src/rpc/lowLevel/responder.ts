import {EventEmitter} from "events";
import {GrpcClient} from "../../lib";

export class Responder extends EventEmitter {
	public GRPCConnection = new GrpcClient();
	public join?: any;

	subscribeToRequests(subscribeRequest: any, reqHandler: Function, errorHandler: Function){
		this.join = this.GRPCConnection.getKubeMQClient().SubscribeToRequests(subscribeRequest);

		this.join.on("error", errorHandler);
		this.join.on("data", reqHandler);

		this.stop = this.stop.bind(this);
	}

	stop() {
		console.log('Stop was called');
		this.join.cancel();
	}

	sendResponse(request: any) {
		return new Promise((resolve, reject) => {
			this.GRPCConnection.getKubeMQClient().SendResponse(request, (e: any, res: any) => {
				if (e) reject(e);

				resolve(res);
			})
		})
	}

	ping() {
		return new Promise((resolve, reject) => {
			this.GRPCConnection.getKubeMQClient().Ping({}, (e: any, res: any) => {
				if (e) reject(e);

				resolve(res);
			})
		})
	}
}
