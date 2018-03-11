import Vue from 'vue';
import { WebviewTag } from 'electron';

class Application {
	public constructor(
		public text: string = 'https://github.com/rog-works',
		public content: string = ''
	) {}

	public bind(selector: string) {
		new Vue({
			el: selector,
			data: this,
			methods: {
				load: this.load.bind(this),
				preload: this.preload.bind(this),
				back: this.back.bind(this),
				forward: this.forward.bind(this),
				reload: this.reload.bind(this),
				tools: this.tools.bind(this)
			}
		});
	}

	public get _webview() {
		return <WebviewTag>document.querySelector('webview');
	}

	public get url() {
		return this._webview.getAttribute('src') || '';
	}

	public set url(value: string) {
		this._webview.setAttribute('src', value);
	}

	public load() {
		this.url = this.text;
	}

	public preload() {
		this.text = this.url;
	}

	public back() {
		this._webview.goBack();
	}

	public forward() {
		this._webview.goForward();
	}

	public reload() {
		this._webview.reload();
	}

	public tools() {
		//if (this._webview.isDevToolsOpened) {
		//	this._webview.closeDevTools();
		//} else {
			this._webview.openDevTools();
		//}
	}

	//reload(url) {
	//	this.loaded = false;
	//	fetch(url)
	//		.then(res => res.text())
	//		.then(content => {
	//			this.content = content;
	//			this.loaded = true;
	//		})
	//		.catch(err => {
	//			this.content = err;
	//			this.loaded = true;
	//		});
	//}
}

new Application().bind('#main');
