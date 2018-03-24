import { URI } from '../lang/URI';

export class Filter {
	public readonly uri: string;
	public readonly match: string;
	public readonly handler: string;
	public readonly tag: string;
	public constructor(data: any) {
		this.uri = data.uri || '';
		this.match = data.match || '';
		this.handler = data.handler || '';
		this.tag = data.tag || '';
	}

	public canHandleURI(uri: URI) {
		if (this.uri.length > 0) {
			return new RegExp(this.uri).test(uri.full);
		}
		return false;
	}

	public canHandleProcess(tag: string) {
		if (this.match.length > 0) {
			return new RegExp(this.match).test(tag);
		}
		return false;
	}

	public async handle(context: any): Promise<any> {
		return await require(this.handler).fetch(context);
	}
}
