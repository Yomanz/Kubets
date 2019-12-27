// https://github.com/kubemq-io/kubemq-node/blob/master/rpc/lowLevel/commandResponse.js
export class CommandResponse {
	public requestID = this.request.RequestID;
	public replyChannel = this.request.ReplyChannel;
	public cacheHit = this.request.CacheHit;
	public timestamp = this.request.TimeStamp;
	public error = this.request.Error;
	public tags = undefined;
	constructor(private request: any, public executed: boolean) {}
}
