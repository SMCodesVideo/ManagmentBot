import swal from 'sweetalert';
const mhs = require('transform-dates');
const {
	initializedCount,
	verifyCounter,
} = require('./timeCounter');
const repository = require('./repository');

export default async function startedIsBot(socket, setStatus) {
	setStatus(true);
	if (verifyCounter() !== 0) 
		return swal('Vish...', `Espere ${mhs(verifyCounter())} para executar outra ação.`, 'error');

	socket.send('application/start', repository);
	initializedCount();

	socket.on('application/start/reply', (event, response) => {
		if (response.error)
			return swal('Deu ruim', response.error, 'error');
	});
}
