const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

module.exports = function Delete(
	reply,
	msg,
	stop
) {
	const pathLocate = path.resolve(
		app.getPath('appData'),
		'managment-bot',
		msg.repository,
	);

	if (!fs.existsSync(pathLocate)) {
		stop(reply);
		return reply.send(
			'repository/delete/reply', {
				error: 'Você não possuí o bot baixado, então não pode excluir.'
			}
		);
	}
	const result = shell.rm('-rf', pathLocate);
	if (result.code !== 0) {
		stop(reply);
		return reply.send(
			'log/register-log',
			'Houve algum erro ao deletar o BOT, porfavor reporte ao meu criador.'
		);
	}

	stop(reply);
	return reply.send(
		'log/register-log',
		`Você excluiu o bot com sucesso! ${pathLocate}`
	);
}
