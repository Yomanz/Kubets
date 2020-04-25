import {kubemqClient, ReceiveQueueMessagesRequest} from '../../protos/generated';

export class StreamHandler {
	constructor(public client: kubemqClient) {}

}
