import {CommandRequest, CommandResponse, GeneralReceiver, GeneralSender, ReceiverType} from "../src/rpc";
import { TextDecoder } from 'text-encoding';
import {Util} from "../src/classes";
import {Request, Response} from "../src/protos";

process.env.KubeMQServerAddress = '127.0.0.1';

const reciever = new GeneralReceiver('hello-world-sender', 'testing_Command_channel', ReceiverType.Commands, undefined, 5000);
const sender = new GeneralSender('hello-world-sender', 'testing_Command_channel', ReceiverType.Commands, 5000);

let request = new Request();
request.setBody(Util.StringToByte('boris'));

// console.log('moving up and down, side to side like a rollercoaster.');
reciever.subscribe((cmd: Request) => {
	console.log('Receiver got a hit for a message!');
	const res = new Response();
	let body = cmd.getBody();

	res.setRequestid(cmd.getRequestid());
	res.setReplychannel(cmd.getReplychannel());
	if (typeof body !== 'string') body = new TextDecoder().decode(body);
	console.log(body);

	reciever.sendResponse(res).then((snd: any) => {
		console.log('Receiver has acknowledged request.!')
	}).catch(console.log)
}, (e: any) => {
	console.log('sub error')
	console.log(e)
});

setTimeout(() => {
	console.log('We are about to send the message: ' + request.getBody());
	sender.send(request).then((res: any) => {
		console.log('Sender has sent message successfully sent and it was acknowledged by the receiver.')
		if (res.Error) {
			console.log('Response error:' + res.Error);
			return;
		}
		console.log(res)
		// console.log('Response Received: ' + res.RequestID + ' ExecutedAt: ' + res.Timestamp);
	}).catch((e: any) => {
		console.log('pub error')
		console.log(e)
	});
}, 1000);
