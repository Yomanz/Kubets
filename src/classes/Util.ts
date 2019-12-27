export class Util {
	constructor() {
		throw new Error(`This class can't be initialized.`)
	}

	public static StringToByte(str: string): Buffer {
		return Buffer.from(str);
	}

	public static ByteToString(body: Buffer): string {
		return body.toString()
	}
}
