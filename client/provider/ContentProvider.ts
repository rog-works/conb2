import { URI } from '../lib/URI';
import { WebProvider } from './WebProvider';

export class ContentProvider {
	public static get(uri: URI) {
		if (uri.scheme === 'file') {
			throw new Error(`Not supported scheme. scheme = ${uri.scheme}`);
		} else if (/^https?$/.test(uri.scheme)) {
			return new WebProvider(uri);
		} else {
			throw new Error(`Unknown scheme. scheme = ${uri.scheme}`);
		}
	}
}
