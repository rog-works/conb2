import * as superagent from 'superagent';
import { URI } from '../lib/URI';
import { ProviderInterface } from './ProviderInterface';

export class WebProvider implements ProviderInterface {
	public constructor(
		public readonly uri: URI
	) {}

	public fetch<T>(): Promise<T> {
		return superagent.get(this.uri.full)
			.then((res: superagent.Response) => {
				return res.body;
			});
	}
}