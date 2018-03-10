import Vue from 'vue';

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
			}
		});
	}

	public get _webview(): any {
		return document.querySelector('webview');
	}

	public get url(): string {
		return this._webview.getAttribute('src');
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

