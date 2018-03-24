import * as Path from 'path';
import * as fs from 'fs';
import * as YAML from 'yamljs';

export class Config {
	private static instance: Config;

	public constructor(
		private readonly data: any)
	{}

	private getValue(key: string): any {
		return this.data[key];
	}

	private static get configPath() {
		return Path.join(__dirname, '../../../config', 'config.yaml');
	}

	private static get self(): Config {
		return this.instance || (this.instance = new this(YAML.load(this.configPath)));
	}

	public static get<T>(key: string): T {
		return this.self.getValue(key);
	}
}
