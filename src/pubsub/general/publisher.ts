import {PubSub} from "../pubsub";
import {Settings} from "../../interfaces";
import {Event, Result} from "../../protos/generated";

export class Publisher extends PubSub {
	constructor(settings: Settings) { super(settings) }

	send(event: Event): Promise<Result> {
		return super.send(event);
	}
}
