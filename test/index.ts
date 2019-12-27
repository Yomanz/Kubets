import {GeneralReciever, RecieverType} from "../src/rpc";

process.env.KubeMQServerAddress = '127.0.0.1';

const reciever = new GeneralReciever('hello-world-sender', 'testing_Command_channel', RecieverType.Commands);

reciever.subscribe((cmd: any) => {
	// const response = new GeneralReciever
}, console.log);
