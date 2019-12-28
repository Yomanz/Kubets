
# KubeTS
```
**Warning**
Although this works, it is in early development and not all of KubeMQ is supported at this current time.
```
A **KubeMQ Library for Typescript** enables Typescript developers to communicate with [KubeMQ](https://kubemq.io/) server in a, mostly, type-safe way!.

## Install me
[NPM Package](https://www.npmjs.com/package/kubets) is the best way to install this.

## Environmental Variables.
The only **required** configuration setting is the KubeMQ server address.
You can only use environmental variables to specify connection information. If you don't use environmental variables you can do something like
```ts
process.env.KubeMQServerAddress = '127.0.0.1'
process.env.KubeMQServerPort = 50000
process.env['KubeMQCertificateFile'] = 'cert.pem'
```
That is also, conveniently,  all of the *current* configurable options.

