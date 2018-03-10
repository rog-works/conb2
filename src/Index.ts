import * as electron from 'electron';
import * as Path from 'path';

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
		if (process.platform !== 'darwin') {
			this.app.quit();
		}
	}

	private onReady() {
		electron.protocol.interceptFileProtocol('file', this.onFilePathRequest.bind(this));
		new MainWindow();
	}

	private onFilePathRequest(req: electron.InterceptFileProtocolRequest, callback: (filePath: string) => void) {
		const url = req.url.substr('file://'.length);
		const path = Path.isAbsolute(url) ? Path.normalize(Path.join(__dirname, '../', 'public', url)) : url;
		callback(path);
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
		this.mainWindow.loadURL('file:///index.html');
	}

	public onClose() {
		this.mainWindow.destroy();
		// this.mainWindow = null XXX nullable
	}
}

new Application(electron.app);
