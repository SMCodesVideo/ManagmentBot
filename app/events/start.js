const { app } = require('electron');
const path = require('path');
const shell = require('shelljs');
const fs = require('fs');
const { exec } = require('child_process');
const child = require('../utils/child_executing');

module.exports = function Start(
	reply,
	msg,
	stop,
) {
	if (!shell.which('node')) {
		stop(reply);
		return reply.send('application/start/reply', {
			error: 'É necessário ter o node instalado em sua máquina.'
		});
	}

	const pathLocate = path.resolve(
		app.getPath('appData'),
		'managment-bot',
		msg.repository
	);

	if (!fs.existsSync(pathLocate)) {
		stop(reply);
		return reply.send(
			'application/start/reply', {
				error: 'Você não tem um bot com esse nome, porfavor baixe-o.'
			}
		);
	}
	if (!shell.which('npm') && !shell.which('yarn')) {
		stop(reply);
		return reply.send('application/start/reply', {
			error: 'Porfavor instale o npm ou yarn em sua máquina.'
		});
	}

	let start;
	if (shell.which('yarn')) {
		start = exec('yarn start', {
			cwd: pathLocate
		});
	} else if (shell.which('npm')) {
		start = exec('npm run start', {
			cwd: pathLocate
		})
	}

	start.stdout.on('data', (data) => {
		child.start(start);
		reply.send('log/register-log', `${data}`);
	});

	start.stderr.on('data', (data) => {
		reply.send('log/register-log', `${data}`);
		reply.send(
			'log/register-log',
			'Bot foi iniciado'
		);
	});
	start.on('close', (code) => {
		reply.send(
			'log/register-log',
			`O comando exectado retornou o código: ${code || 'sucesso'}`
		);
		stop(reply);
	});
}
