import { ipcRenderer } from 'electron';

console.log('On Preload before');
ipcRenderer.sendToHost('preload', 'some return values');
console.log('On Preload after');

class Handler {
	public bind() {
		this.on(window, 'load', this.load);
		//this.on(window, 'beforeunload', this.beforeUnload);
		//this.bindSubmit();
	}

	private bindSubmit() {
		for (const form of document.getElementsByTagName('form')) {
			this.on(form, 'submit', this.submit.bind(this));
		}
	}

	private load(e: Event) {
		console.log('On Load');
		return true;
	}

	private beforeUnload(e: Event)  {
		console.log('On Before unload');
		if (!confirm('ok?')) {
			console.log('cancel');
			e.preventDefault();
			return false;
		}
		return true;
	}

	private submit(e: Event) {
		console.log('On Submit');
		this.off(window, 'beforeunload', this.beforeUnload);
		return true;
	}

	private on(target: Window | HTMLFormElement, type: 'load' | 'beforeunload' | 'submit', listener: (e: Event) => boolean) {
		target.addEventListener(type, listener, false);
	}

	private off(target: Window | HTMLFormElement, type: 'load' | 'beforeunload' | 'submit', listener: (e: Event) => boolean) {
		target.removeEventListener(type, listener, false);
	}
}

new Handler().bind();
