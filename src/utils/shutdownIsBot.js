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

	socket.send('application/stop', repository);
	initializedCount();

	socket.on('application/stop/reply', (event, response) => {
		console.log(response);
		if (response.error)
			return swal('Iiih', response.error, 'error');
	});
}
