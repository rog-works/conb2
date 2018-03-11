import Vue from 'vue';
import { WebviewTag } from 'electron';

class Application {
	public constructor(
		public text: string = 'https://github.com/rog-works'
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
				openDevTools: this.openDevTools.bind(this)
			}
		});
	}

	public get _webview() {
		const webview = document.querySelector('webview');
		if (!webview) {
			throw new Error('Not found webview tag');
		}
		return <WebviewTag>webview;
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

	public openDevTools() {
		this._webview.openDevTools();
	}
}

new Application().bind('#main');
