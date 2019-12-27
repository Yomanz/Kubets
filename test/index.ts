import {CommandReciever} from "../src/rpc";

process.env.KubeMQServerAddress = '127.0.0.1';

const reciever = new CommandReciever('hello-world-sender', 'testing_Command_channel');

reciever.subscribe((cmd: any) => {

}, console.log);
