import {CommandRequest, CommandResponse, GeneralReceiver, GeneralSender, RecieverType} from "../src/rpc";
import {Util} from "../src/classes";

process.env.KubeMQServerAddress = '127.0.0.1';

const reciever = new GeneralReceiver('hello-world-sender', 'testing_Command_channel', RecieverType.Commands, undefined, 5000);
const sender = new GeneralSender('hello-world-sender', 'testing_Command_channel', RecieverType.Commands, 5000);

let request = new CommandRequest(Util.StringToByte('"boris"'));

// console.log('moving up and down, side to side like a rollercoaster.');
reciever.subscribe((cmd: any) => {
	console.log('Receiver got a hit for a message!')
	const response = new CommandResponse(cmd, true);
	// @ts-ignore
	console.log(`The message was: ${Util.ByteToString(response.request.Body)}`);
	response.Timestamp = Math.floor(new Date().getTime() / 1000);

	reciever.sendResponse(response).then((snd: any) => {
		console.log('Receiver has acknowledged request.!')
		// console.log(snd);
	}).catch(console.log)
}, (e: any) => {
	console.log('sub error')
	console.log(e)
});

setTimeout(() => {
	console.log('We are about to send the message: ' + Util.ByteToString(request.Body));
	sender.send(request).then((res: any) => {
		console.log('Sender has sent message successfully sent and it was acknowledged by the receiver.')
		if (res.Error) {
			console.log('Response error:' + res.Error);
			return;
		}
		// console.log('Response Received: ' + res.RequestID + ' ExecutedAt: ' + res.Timestamp);
	}).catch((e: any) => {
		console.log('pub error')
		console.log(e)
	});
}, 1000);
