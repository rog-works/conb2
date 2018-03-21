import * as Electron from 'electron';
import * as Path from 'path';
import * as Moment from 'moment';

class Application {
	public constructor(
		private readonly app: Electron.App)
	{
		this.bind();
	}

	private bind() {
		console.log('On Main initialized', Moment().format('YYYY-MM-DD HH:mm:ss'));
		this.app.on('window-all-closed', this.onWindowAllClosed.bind(this));
		this.app.on('ready', this.onReady.bind(this));
		Electron.ipcMain.on('message', this.onMessage.bind(this));
	}

	private onWindowAllClosed() {
		console.log('On Window all closed', Moment().format('YYYY-MM-DD HH:mm:ss'));
		if (process.platform !== 'darwin') {
			this.app.quit();
		}
	}

	private onReady() {
		console.log('On Ready', Moment().format('YYYY-MM-DD HH:mm:ss'));
		Electron.protocol.interceptFileProtocol('file', this.onFilePathRequest.bind(this));
		new MainWindow();
	}

	private onFilePathRequest(req: Electron.InterceptFileProtocolRequest, callback: (filePath: string) => void) {
		console.log('On File path request', Moment().format('YYYY-MM-DD HH:mm:ss'));
		const url = req.url.substr('file://'.length);
		const path = Path.isAbsolute(url) ? Path.normalize(Path.join(__dirname, '../../', 'assets', url)) : url;
		callback(path);
	}

	private onMessage(e: Electron.Event, data: any) {
		console.log('On Message', Moment().format('YYYY-MM-DD HH:mm:ss'), data);
		e.sender.send('reply', 'message received');
	}
}

class MainWindow {
	private readonly mainWindow: Electron.BrowserWindow;

	constructor() {
		this.mainWindow = new Electron.BrowserWindow({
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
		console.log('On Close', Moment().format('YYYY-MM-DD HH:mm:ss'));
		this.mainWindow.destroy();
		// this.mainWindow = null XXX nullable
	}
}

new Application(Electron.app);
