import * as fs from 'fs';
import * as Path from 'path';
import * as Electron from 'electron';
import * as Moment from 'moment';
import { URI } from './lang/URI';
import { Sign } from './security/Sign';
import { Provider } from './content/Provider';

class Application {
	public constructor(
		private readonly app: Electron.App,
		private readonly cwd: string = Path.join(__dirname, '../../') // XXX
	) {
		this.bind();
	}

	private bind() {
		console.log('On Main initialized', Moment().format('YYYY-MM-DD HH:mm:ss'));
		this.app.on('window-all-closed', this.onWindowAllClosed.bind(this));
		this.app.on('ready', this.onReady.bind(this));
		this.app.on('web-contents-created', this.onWebContentsCreated.bind(this));
		Electron.ipcMain.on('renderer-ready', this.onRendererReady.bind(this));
		Electron.ipcMain.on('webview-prefetch', this.onWebviewPrefetch.bind(this));
	}

	private onWebContentsCreated(e: Electron.Event, contents: Electron.WebContents) {
		console.log('On Web contents created', Moment().format('YYYY-MM-DD HH:mm:ss'), e, contents);
		if ((<any>contents).getType() === 'webview') { // XXX any
			contents.on('will-navigate', this.onWebivewWillNavigate.bind(this));
		}
	}

	private onWebivewWillNavigate(e: Electron.Event, url: string) {
		console.log('On Webview will navigate', Moment().format('YYYY-MM-DD HH:mm:ss'), e, url);
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
		console.log('On File path request', Moment().format('YYYY-MM-DD HH:mm:ss'), req.url);
		const url = req.url.substr('file://'.length);
		const path = Path.isAbsolute(url) ? Path.normalize(Path.join(this.cwd, 'assets/', url)) : url;
		callback(path);
	}

	private onRendererReady(e: Electron.Event, data: any) {
		console.log('On Renderer ready', Moment().format('YYYY-MM-DD HH:mm:ss'), data);
		e.sender.send('reply-renderer-ready', { cwd: this.cwd });
	}

	private async onWebviewPrefetch(e: Electron.Event, data: any) {
		console.log('On Webview prefetch', Moment().format('YYYY-MM-DD HH:mm:ss'), data.uri);
		const uri = new URI(data.uri);
		if (Provider.canFetch(uri)) {
			const body = await Provider.fetch<string>(uri);
			const dirName = uri.host;
			const fileName = `${Sign.digest(uri.full)}.html`;
			const webPath = Path.join('/cache', dirName, fileName);
			const storagePath = Path.join(this.cwd, 'assets/', webPath);
			if (!fs.existsSync(Path.dirname(storagePath))) {
				fs.mkdirSync(Path.dirname(storagePath));
			}
			fs.writeFileSync(storagePath, body);
			e.sender.send('reply-webview-prefetch', { uri: `file://${webPath}` });
		} else {
			e.sender.send('reply-webview-prefetch', data);
		}
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
