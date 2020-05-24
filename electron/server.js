const { app, BrowserWindow } = require('electron');
require('../app');
const os = require('os');
const path = require('path');

const Electron = require('./electron');

let application = null;

app.on('ready', () => {
	application = new Electron(BrowserWindow);
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('ativate', () => {
	if (!application) {
		application = new Electron(BrowserWindow);
	}
});
