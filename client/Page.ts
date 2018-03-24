import { Web } from './content/Web';

export class Page {
	public constructor() {

	}

	public async load() {
		this.url = this.text;
	}

	public prepare() {
		this.text = this.url;
	}

	public back() {
		this.webview.goBack();
	}

	public forward() {
		this.webview.goForward();
	}

	public reload() {
		this.webview.reload();
	}

	public openDevTools() {
		this.webview.openDevTools();
	}

	private onPreload(data: any) {
		console.log('On Preload', new Date, data);
	}

	public on(tag: string, callback: Function) {
		const self = this; // XXX
		if (!(tag in this.handlers)) {
			this.handlers[tag] = [];callback;
		}
		this.handlers[tag].push(callback);

		this.webview.addEventListener('ipc-message', (e: Event) => {
			const channel: string = (<any>e).channel; // XXX Event undefined property 'channel'
			const args: any[] = (<any>e).args; // XXX Event undefined property 'args'
			if (channel in self.handlers) {
				for (const handler of self.handlers[channel]) {
					handler(...args);
				}
			}
		});
	}
}