export class Util {
	constructor() {
		throw new Error(`This class can't be initialized.`)
	}

	public static StringToByte(str: string): Buffer {
		return Buffer.from(str);
	}

	public static BytesToString(bytes: Uint8Array) {
		const chars = [];
		for(let i = 0, n = bytes.length; i < n;) {
			chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
		}
		return String.fromCharCode.apply(null, chars);
	}
}
