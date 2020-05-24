const { app } = require('electron');
const kill = require('tree-kill');
const child = require('../utils/child_executing');

module.exports = function Stop(
	reply,
	msg,
	stop,
) {
	const { msg: getInfoMsg, status } = child.get();
	if (!status) {
		stop(reply);
		return reply.send('application/stop/reply', { error: getInfoMsg });
	}
	stop(reply);
	kill(getInfoMsg.pid, (err) => {
		if (err) {
			stop(reply);
			return reply.send(
				'application/stop/reply',
				{
					error: 'Houve algum erro ao desligar o bot.'
				}
			);
		}
		const { status: getNewStatus, msg: getNewInfoMsg } = child.stop();
		if (!status) {
			stop(reply);
			return reply.send(
				'application/stop/reply',
				{
					error: getNewInfoMsg
				}
			);
		}
		stop(reply);
		return reply.send(
			'log/register-log',
			'O bot foi desligado com sucesso!'
		);
	});
}
