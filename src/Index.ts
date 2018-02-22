import * as electron from 'electron';

class Application {
	public constructor(
		private readonly app: electron.App)
	{
		this.bind();
	}

	private bind() {
		this.app.on('window-all-closed', this.onWindowAllClosed.bind(this));
		this.app.on('ready', this.onReady.bind(this));
	}

	private onWindowAllClosed() {
		if (process.platform != 'darwin') {
			this.app.quit();
		}
	}

	private onReady() {
		new MainWindow();
	}
}

class MainWindow {
	private readonly mainWindow: electron.BrowserWindow;

	constructor() {
		this.mainWindow = new electron.BrowserWindow({
			width: 800,
			height: 400,
			minWidth: 500,
			minHeight: 200,
			acceptFirstMouse: true,
			titleBarStyle: 'hidden'
		});
		this.mainWindow.on('close', this.onClose.bind(this));
		this.mainWindow.loadURL(`file:///E:/conb2/src/index.html`);
	}

	public onClose() {
		this.mainWindow.destroy();
		// this.mainWindow = null XXX nullable
	}
}

new Application(electron.app);
