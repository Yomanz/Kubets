import {GrpcClient} from "../lib";

export class PubSub {
	private GRPCConnection = new GrpcClient(this.settings);
}
