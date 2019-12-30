import {Settings} from "../../interfaces";
import {PubSub} from "../pubsub";

export class Subscriber extends PubSub {
	constructor(settings: Settings) { super(settings) }

	subscribe(reqHandler: (...args: any[]) => void, errorHandler: (...args: any[]) => void) {
		super.subscribe(reqHandler, errorHandler);
	}

	unsubscribe() {
		super.unsubscribe();
	}
}
