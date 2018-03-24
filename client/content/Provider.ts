import { URI } from '../lib/URI';
// import { Pipeline } from '../filter';

class Config {
	public static get(key: string): Object {
		return {};
	}
}

class Pipeline {
	public constructor(config: Object) {

	}
	public async fetch<T>(uri: URI): Promise<T> {
		return <T>{};
	}
}

export class Provider {
	public static async fetch<T>(uri: URI): Promise<T >{
		return new Pipeline(Config.get('pipeline')).fetch<T>(uri);
	}
}
