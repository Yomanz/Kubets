
# KubeTS - A typesafe wrapper for KubeMQ.

[![Downloads](https://img.shields.io/npm/dt/kubets.svg)](https://www.npmjs.com/package/kubets)
[![npm bundle size](https://img.shields.io/bundlephobia/min/kubets)](https://www.npmjs.com/package/kubets)
[![Version](https://img.shields.io/npm/v/kubets.svg)](https://www.npmjs.com/package/kubets)
[![License](https://img.shields.io/npm/l/kubets)](https://www.npmjs.com/package/kubets)
---

A **KubeMQ Library for Typescript** enables Typescript developers to communicate with [KubeMQ](https://kubemq.io/) server in a type-safe way!.

## Prerequisites
[KubeMQ](https://kubemq.io/) is what powers the library!
[NPM Package](https://www.npmjs.com/package/kubets) is the best way to install this package.

## Examples
###### First steps
```bash
yarn add kubets
// OR
npm i -s kubets
```
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
