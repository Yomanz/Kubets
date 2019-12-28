import {credentials} from 'grpc';
import {Config} from '../classes';
import {readFileSync} from 'fs';
import {kubemqClient} from '../protos/generated';

export class GrpcClient {
	public client: kubemqClient = this.createClient(); // TODO: Types for this, Check it is actually always available.
	private metadata: any[] = [];

	createClient(): kubemqClient {
		let client: kubemqClient;
		this.metadata = ["X-Kubemq-Server-Token", Config.get('KubeMQRegistrationKey')];
		const clientCertFile = Config.get('KubeMQCertificateFile');

		if (clientCertFile) {
			let contents = readFileSync(clientCertFile);
			client = new kubemqClient(`${Config.get('KubeMQServerAddress', '127.0.0.1')}:${Config.get('KubeMQServerPort', 50000)}`, credentials.createSsl(contents));
		} else {
			client = new kubemqClient(`${Config.get('KubeMQServerAddress', '127.0.0.1')}:${Config.get('KubeMQServerPort', 50000)}`, credentials.createInsecure());
		}

		return client;
	}
}
