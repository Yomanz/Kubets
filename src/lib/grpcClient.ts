import {credentials} from 'grpc';
import {Config} from '../classes';
import {readFileSync} from 'fs';
import {kubemqClient} from '../protos/generated';
import {Settings} from "../interfaces";

export class GrpcClient {
	public client: kubemqClient = this.createClient(); // TODO: Types for this, Check it is actually always available.
	private metadata: any[] = [];
	constructor(protected settings: Settings) {}

	createClient(): kubemqClient {
		let client: kubemqClient;
		this.metadata = ["X-Kubemq-Server-Token", Config.get('KubeMQRegistrationKey')];

		if (this.settings.cert) {
			let contents = readFileSync(this.settings.cert);
			client = new kubemqClient(`${this.settings.host}:${this.settings.port}`, credentials.createSsl(contents), this.settings.options);
		} else {
			client = new kubemqClient(`${this.settings.host}:${this.settings.port}`, credentials.createInsecure(), this.settings.options);
		}

		return client;
	}
}
