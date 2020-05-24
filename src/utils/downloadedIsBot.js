import swal from 'sweetalert';
const mhs = require('transform-dates');
const {
	initializedCount,
	verifyCounter
} = require('./timeCounter');
const repository = require('./repository');

export default async function downloadedIsBot(socket, setStatus) {
	setStatus(true);
	if (verifyCounter() !== 0)
		return swal('Vish...', `Espere ${mhs(verifyCounter())} para executar outra ação.`, 'error');
	socket.send('repository/download', repository);
	initializedCount(5000);

	socket.on('repository/download/reply', (event, response) => {
		if (response.error) return swal('Oops...', response.error, 'error');
	});
}

