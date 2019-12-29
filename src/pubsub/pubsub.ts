import {GrpcClient} from "../lib";
import {Settings} from "../interfaces";
import {Taker, Giver} from "./lowLevel";
import {Event, Result, Subscribe} from "../protos/generated";

export class PubSub {
	public GRPCConnection = new GrpcClient(this.settings);
	public giver: Giver = new Giver(this.GRPCConnection.client);
	public taker?: Taker;
	constructor(private settings: Settings) {}

	close(): void {
		this.GRPCConnection.client.close();
		this.taker?.stop();
	}

	send(event: Event): Promise<Result> {
		event.setChannel(this.settings.channel);
		event.setClientid(this.settings.client);

		return this.giver.sendEvent(event);
	}

	subscribe(reqHandler: (...args: any[]) => void, errorHandler: (...args: any[]) => void) {
		this.taker = new Taker(this.GRPCConnection.client);

		const sub = new Subscribe();
		// @ts-ignore TODO: 1|2|3|4 < number?
		sub.setSubscribetypedata(this.settings.type + 2);
		sub.setClientid(this.settings.client);
		sub.setChannel(this.settings.channel);
		sub.setGroup(this.settings.group || '');

		this.taker.subscribeToEvents(sub, reqHandler, errorHandler);
	}

	unsubscribe() {
		if (this.taker) this.taker.stop();
	}
}
