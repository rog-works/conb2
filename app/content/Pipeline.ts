import { URI } from '../lang/URI';
import { Filter } from './Filter';

export class Pipeline {
	public constructor(
		private readonly config: any)
	{}

	public canFetch(uri: URI) {
		return this.getFilters(uri).length > 0;
	}

	public async fetch<T>(uri: URI): Promise<T> {
		let data: any = uri;
		for (const filter of this.getFilters(uri)) {
			data = await filter.handle(data);
		}
		return <T>data;
	}

	public getFilters(uri: URI) {
		const filters: Filter[] = [];
		const tags: string[] = [];
		for (const step in this.config) {
			const steps = this.config[step];
			for (const key in steps) {
				const filter = new Filter(steps[key]);
				if (filter.canHandleURI(uri)) {
					filters.push(filter);
					tags.push(filter.tag);
				}
				for (const tag in tags) {
					if (filter.canHandleProcess(tag)) {
						filters.push(filter);
						tags.push(filter.tag);
					}
				}
			}
		}
		return filters;
	}

}
