import { URI } from '../lib/URI';

export interface ProviderInterface {
	fetch: <T>() => Promise<T>;
}
