const { ipcMain } = require('electron');
const stopingExecuting = require('./utils/stopingExecuting');

const DownloadController = require('./events/download');
const DeleteController = require('./events/delete');
const StartController = require('./events/start');
const StopController = require('./events/stop');

const child = require('./utils/child_executing');

ipcMain.on('repository/download', (event, data) => {
	console.log('downloading...');
	DownloadController(event.sender, data, stopingExecuting);
});

ipcMain.on('repository/delete', (event, data) => {
	console.log('excluing...');
	DeleteController(event.sender, data, stopingExecuting);
});

ipcMain.on('application/start', (event, data) => {
	console.log('starting...');
	StartController(event.sender, data, stopingExecuting);
});

ipcMain.on('application/stop', (event, data) => {
	console.log('stoping...');
	StopController(event.sender, data, stopingExecuting, child);
});

ipcMain.on('disconnect', () => {
	console.log('a user disconnect');
})
