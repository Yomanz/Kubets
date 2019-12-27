import {CommandResponse, GeneralReciever, RecieverType} from "../src/rpc";

process.env.KubeMQServerAddress = '127.0.0.1';

const reciever = new GeneralReciever('hello-world-sender', 'testing_Command_channel', RecieverType.Commands);
const sender = new Sender

console.log('moving up and down, side to side like a rollercoaster.')
reciever.subscribe((cmd: any) => {
	console.log('got a hit')
	const response = new CommandResponse(cmd, true);
	response.timestamp = Math.floor(new Date().getTime() / 1000);

	reciever.sendResponse(response).then(snd => {
		console.log('sent:' + snd);
	}).catch(console.log)
}, console.log);
