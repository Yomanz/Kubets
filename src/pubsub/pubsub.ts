import {GrpcClient} from "../lib";
import {Settings} from "../interfaces";
import {Taker, Giver} from "./lowLevel";
import {Event, Result, Subscribe} from "../protos/generated";

export class PubSub extends GrpcClient {
	protected giver: Giver = new Giver(this.client);
	protected taker?: Taker;
	constructor(settings: Settings) { super(settings) }

	close(): void {
		this.client.close();
		this.taker?.stop();
	}

	protected send(event: Event): Promise<Result> {
		event.setChannel(this.settings.channel);
		event.setClientid(this.settings.client);

		return this.giver.sendEvent(event);
	}

	protected subscribe(reqHandler: (...args: any[]) => void, errorHandler: (...args: any[]) => void) {
		this.taker = new Taker(this.client);

		const sub = new Subscribe();
		// @ts-ignore TODO: 1|2|3|4 < number?
		sub.setSubscribetypedata(this.settings.type + 2);
		sub.setClientid(this.settings.client);
		sub.setChannel(this.settings.channel);
		sub.setGroup(this.settings.group || '');

		this.taker.subscribeToEvents(sub, reqHandler, errorHandler);
	}

	protected unsubscribe() {
		if (this.taker) this.taker.stop();
	}
}
