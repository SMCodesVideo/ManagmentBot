const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

class Electron {
	constructor(BrowserWindow) {
		this.window;

		this.createWindow(BrowserWindow);
		this.windowUrl();
		this.closedApp();
	}

	createWindow(BrowserWindow) {
		this.window = new BrowserWindow({
			width: 800,
			height: 800,
			icon: path.resolve(__dirname, '..', 'public', 'icone.png'),
			webPreferences: {
				preload: path.join(__dirname, 'preload.js'),
				nodeIntegration: true,
			}
		});
		this.window.removeMenu();
	}

	windowUrl() {
		let urlLocate = process.env.ELECTRON_START_URL || url.format({
			pathname: path.resolve(__dirname, '..', 'index.html'),
			protocol: 'file:',
			slashes: true,
		});
		this.window.loadURL(urlLocate);
	}

	closedApp() {
		this.window.on('closed', () => {
			this.window = null;
		});
	}
}

module.exports = Electron;
