import { GrpcClient } from "../../lib";

export class Initiator {
	public GRPCConnection = new GrpcClient();

	sendRequest(request: any): Promise<any> { // TODO: Types
		return new Promise(((resolve, reject) => {
			this.GRPCConnection.getKubeMQClient().SendRequest()
		}))
	}
}
