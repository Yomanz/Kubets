import {credentials, loadPackageDefinition} from 'grpc';
import {loadSync} from '@grpc/proto-loader'
import {Config} from "../classes";
import {readFileSync} from "fs";

export class GrpcClient {
	// Proto Setup
	protected loadpck: any = null; // TODO: Types for this

	// GrpcClient Stuff
	private client!: any; // TODO: Types for this, Check it is actually always available.
	private metadata: any[] = [];

	constructor() {
		this.init();
		this.getKubeMQClient.bind(this); // TODO: This uses .bind(this) for some unknown reason lol
	}

	init() {
		// TODO: That's wrapped with () for some unknown reason?!?
		this.metadata = ["X-Kubemq-Server-Token", Config.get('KubeMQRegistrationKey')];
	}

	getKubeMQClient() {
		if (!this.client) {
			const clientCertFile = Config.get('KubeMQCertificateFile');
			if (clientCertFile) {
				let contents = readFileSync(clientCertFile);
				// TODO: Types for proto files (check shared)
				this.client = new this.proto.service.kubemq(`${Config.get('KubeMQServerAddress')}:${Config.get('KubeMQServerPort', 50000)}`, credentials.createSsl(contents))
			} else {
				this.client = new this.proto.service.kubemq(`${Config.get('KubeMQServerAddress')}:${Config.get('KubeMQServerPort', 50000)}`, credentials.createInsecure())
			}
		}

		return this.client;
	}

	get proto() {
		if (!this.loadpck) {
			const loader = loadSync(`${__dirname} + \\..\\protos\\grpc\\kubemq.proto`, {
				keepCase: true,
				longs: String,
				enums: String,
				defaults: true,
				oneofs: true
			});
			const proto = loadPackageDefinition(loader);

			// @ts-ignore TODO: Check why I have to ts-ignore thiis
			this.loadpck = loadPackageDefinition(proto).kubemq;
		}
		return this.loadpck
	}
}
