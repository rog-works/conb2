import { URI } from '../lang/URI';
import { Config } from '../lib/Config';
import { Pipeline } from './Pipeline';

export class Provider {
	public static canFetch(uri: URI) {
		return new Pipeline(Config.get('pipeline')).canFetch(uri);
	}

	public static async fetch<T>(uri: URI): Promise<T> {
		return new Pipeline(Config.get('pipeline')).fetch<T>(uri);
	}
}
