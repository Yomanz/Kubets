import {StreamHandler} from '../lowLevel/StreamHandler';
import {MessageQueue} from '../MessageQueue';
import {
	ReceiveQueueMessagesRequest,
	ReceiveQueueMessagesResponse,
	StreamQueueMessagesRequest, StreamQueueMessagesResponse,
	StreamRequestType
} from '../../protos/generated';
import {Util} from '../../classes';
import {ClientDuplexStream, ClientReadableStream} from 'grpc';

export class Transaction extends MessageQueue {
	protected handler: StreamHandler = new StreamHandler(this.client);
	private stream?: ClientDuplexStream<StreamQueueMessagesRequest, StreamQueueMessagesResponse>;

	async receive(cb: (...args: any[]) => any, errorCB: (...args: any[]) => any, visibility: number = 1, wait: number = 1) {
		if (this.openStream()) return Promise.reject('Stream already open, please call ack');

		const req = new StreamQueueMessagesRequest();
		req.setClientid(this.settings.client);
		req.setChannel(this.queueSettings.queue);
		req.setRequestid(Util.generateId());
		req.setStreamrequesttypedata(StreamRequestType.RECEIVEMESSAGE)
		req.setVisibilityseconds(visibility)
		req.setWaittimeseconds(wait || this.queueSettings.waitTime || 0)
		req.setRefsequence(0);

		this.stream!.on('data', cb);
		this.stream!.on('error', errorCB);
		this.stream!.write(req);
	}

	private openStream() {
		if (!this.stream) {
			this.stream = this.client.streamQueueMessage();
			return false;
		} else {
			return true;
		}
	}

	private closeStream() { // TODO: Look into async-locks
		if (this.stream) {
			this.stream.cancel();
			this.stream = undefined;
			return true;
		} else {
			console.log('Stream is closed');
			return false;
		}
	}

	private checkCallIsInTransaction() {
		return !!this.stream;
	}
}
