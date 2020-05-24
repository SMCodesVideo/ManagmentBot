const { app } = require('electron');
const path = require('path');
const shell = require('shelljs');
const fs = require('fs');
const { exec } = require('child_process');

module.exports = function Download(
	reply,
	msg,
	stop
) {
	if (!shell.which('git')) {
		stop(reply);
		return reply.send('repository/download/reply', {
			error: 'É necessário ter o git instalado em sua máquina.'
		});
	}
	if (!shell.which('npm') && !shell.which('yarn')) {
		stop(reply);
		return reply.send('repository/download/reply', {
			error: 'Porfavor instale o npm ou yarn em sua máquina.'
		});
	}

	const pathLocate = path.resolve(
		app.getPath('appData'),
		'managment-bot',
		msg.repository
	);
	if (fs.existsSync(pathLocate)) {
		stop(reply);
		return reply.send(
			'repository/download/reply', {
			error: 'Você já tem um bot com esse nome, porfavor exclua seu bot.'
		}
		);
	}

	const clone = exec(`git clone http://github.com/${msg.user}/${msg.repository} ${pathLocate}`);

	clone.stdout.on('data', (data) => {
		reply.send('log/register-log', `${data}`);
	});

	clone.stderr.on('data', (data) => {
		reply.send('log/register-log', `${data}`);
	});

	clone.on('close', (code) => {
		reply.send(
			'log/register-log',
			`O comando executado retornou o código: ${code}`
		);
		let install;

		if (shell.which('yarn')) {
			install = exec('yarn', {
				cwd: pathLocate
			});
		} else if (shell.which('npm')) {
			install = exec('npm', [
				'install'
			], {
				cwd: pathLocate
			});
		}
		let stdoutRegisterOld = null;
		install.stdout.on('data', (data) => {
			if (`${data}` === stdoutRegisterOld) return;
			stdoutRegisterOld = `${data}`;
			reply.send('log/register-log', `${data}`);
		});
		install.stderr.on('data', (data) => {
			reply.send('log/register-log', `${data}`);
		});
		install.on('close', (code) => {
			reply.send(
				'log/register-log',
				`O comando exectado retornou o código: ${code}`
			);
			stop(reply);
		});
	});
}
