export class CommandRequest {
	public requestID = undefined;
	public metadata = undefined;
	public timeout = undefined;
	public tags = undefined;
	constructor(public body: any) {}
}
