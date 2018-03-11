import Vue from 'vue';
import { WebviewTag } from 'electron';

interface EventHandlers {
	[key: string]: Function[];
}

class Application {
	public constructor(
		public text: string = 'https://github.com/rog-works',
		private readonly handlers: EventHandlers = {}
	) {}

	public bind(selector: string) {
		new Vue({
			el: selector,
			data: this,
			methods: {
				load: this.load.bind(this),
				prepare: this.prepare.bind(this),
				back: this.back.bind(this),
				forward: this.forward.bind(this),
				reload: this.reload.bind(this),
				openDevTools: this.openDevTools.bind(this)
			}
		});
		this.on('preload', this.onPreload.bind(this))
	}

	private get webview() {
		const webview = document.querySelector('webview');
		if (!webview) {
			throw new Error('Not found webview tag');
		}
		return <WebviewTag>webview;
	}

	public get url() {
		return this.webview.getAttribute('src');
	}

	public set url(value: string) {
		this.webview.setAttribute('src', value);
	}

	public get preload() {
		return this.webview.getAttribute('preload');
	}

	public set preload(value: string) {
		this.webview.setAttribute('preload', value);
	}

	public load() {
		this.preload = 'file://c:\\work\\app\\server\\conb2\\dist\\webview\\Index.js'; // FIXME to workspace path
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
		console.log('On Preload', data);
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

new Application().bind('#main');
