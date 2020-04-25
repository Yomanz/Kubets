import {GrpcClient} from '../lib';
import {QueueSettings, Settings} from '../interfaces';
import {AckAllQueueMessagesRequest, QueueMessage, ReceiveQueueMessagesRequest} from '../protos'
import {QueueSender} from './lowLevel/QueueSender';
import {Util} from '../classes';
import {QueueReceiver} from './lowLevel/QueueReceiver';

export class MessageQueue extends GrpcClient {
	protected sender: QueueSender = new QueueSender(this.client);
	protected receiver: QueueReceiver = new QueueReceiver(this.client);
	constructor(protected queueSettings: QueueSettings) { super(queueSettings) }

	async sendMessage(message: QueueMessage) {
		const mappedMessage = this.mapMessage(message);

		return this.sender.sendQueueMessage(mappedMessage)
	}

	async receiveMessages(amount?: number, wait?: number) {
		const id = Util.generateId();
		if (!wait) wait = this.queueSettings.waitTime || 0;

		const request = new ReceiveQueueMessagesRequest()
		request.setIspeak(false);
		request.setMaxnumberofmessages(this.queueSettings.maxNumberOfMessage);
		request.setWaittimeseconds(wait);
		request.setRequestid(id)
		request.setClientid(this.settings.client)
		request.setChannel(this.queueSettings.queue)

		return this.receiver.receiveQueueMessages(request);
	}

	async sendBulkMessage(messages: QueueMessage[]) {
		const id = Util.generateId();
		const mappedMessages = messages.map(m => this.mapMessage(m));

		return this.sender.sendBulkQueueMessages(mappedMessages, id);
	}

	async ackAllMessages() {
		const req = new AckAllQueueMessagesRequest()
		req.setRequestid(Util.generateId());
		req.setClientid(this.settings.client);
		req.setChannel(this.queueSettings.queue);
		req.setWaittimeseconds(this.queueSettings.waitTime || 0)

		return this.sender.ackAllQueueMessages(req);
	}

	private mapMessage(message: QueueMessage) {
		if (!message.getChannel()) message.setChannel(this.queueSettings.queue);
		if (!message.getClientid()) message.setClientid(this.queueSettings.client);

		return message;
	}
}
