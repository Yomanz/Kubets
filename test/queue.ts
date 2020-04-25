import {MessageQueue} from '../src/queue';
import {QueueMessage, StreamQueueMessagesResponse, StreamRequestType} from '../src/protos/generated';

const queue = new MessageQueue({
	host: '127.0.0.1',
	port: 50000,
	queue: 'DiscordEvents',
	waitTime: 10,
	client: 'worker'
})

const sender = new MessageQueue({
	host: '127.0.0.1',
	port: 50000,
	waitTime: 1,
	queue: 'DiscordEvents',
	client: 'worker'
})

setInterval(async () => {
	const msg = new QueueMessage;
	msg.setChannel('DiscordEvents');
	msg.setBody(new Uint8Array([0, 1, 45, 6, Math.round(Math.random()) + 1]))
	await sender.sendMessage(msg)
}, 2000);

let transaction = queue.createTransaction();

const cb = async (msg: StreamQueueMessagesResponse) => {
	console.log(msg.getStreamrequesttypedata())
	if (msg.getStreamrequesttypedata() === StreamRequestType.RECEIVEMESSAGE) {
		if (!msg.getError() ?? true) {
			console.log(msg.getRequestid())
			await transaction.ack(msg.toObject().message!.attributes!.sequence);
		}
	} else if (msg.getStreamrequesttypedata() === StreamRequestType.ACKMESSAGE || msg.getStreamrequesttypedata() === StreamRequestType.REJECTMESSAGE) {
		await transaction.handler.close();
		console.log('lol??')

		transaction = queue.createTransaction();
		transaction.receive(cb, console.error);
	}
}

transaction.receive(cb, console.error)

