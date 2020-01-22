
# KubeTS
```
**Warning**
Although this works, it is in early development and not all of KubeMQ is supported at this current time.
```
A **KubeMQ Library for Typescript** enables Typescript developers to communicate with [KubeMQ](https://kubemq.io/) server in a, mostly, type-safe way!.

## Install me
[NPM Package](https://www.npmjs.com/package/kubets) is the best way to install this.

## Examples
###### Initialising the classes.
```typescript
import { ReceiverType, GeneralReceiver, GeneralSender } from 'kubets'
const reciever = new GeneralReceiver({
	host: '127.0.0.1',
	port: 50000,
	channel: 'testing_Command_channel',
	client: 'hello-world-receiver',
	type: ReceiverType.Query,
	defaultTimeout: 50000
});
const sender = new GeneralSender({
	host: '127.0.0.1',
	port: 50000,
	channel: 'testing_Command_channel',
	client: 'hello-world-sender',
	type: ReceiverType.Query,
	defaultTimeout: 50000
});
```

###### Listening to a message via RPC.
```typescript
import { Request, Response } from 'kubets';
receiver.subscribe(async (cmd: Request) => {
    console.log('Received a message.')
    // ...

    const res = new Response();
    res.setBody(Buffer.from('example body!'))
    await receiver.ack(cmd, res);
})
```

###### Sending a message via RPC.
```typescript
import { Request } from 'kubets'

const request = new Request();
request.setBody(Buffer.from(JSON.stringify({
    data: 'xxxx',
    moreData: 50513
})));
request.setTimeout(10000);

const res = await sender.send(request);
res.xxx
```
