import swal from 'sweetalert';
const mhs = require('transform-dates');
const {
	initializedCount,
	verifyCounter,
} = require('./timeCounter');
const repository = require('./repository');

export default async function deleteIsBot(socket, setStatus) {
	setStatus(true);
	if (verifyCounter() !== 0)
		return swal('Vish...', `Espere ${mhs(verifyCounter())} para executar outra ação.`, 'error');
	socket.send('repository/delete', repository);
	initializedCount(5000);

	socket.on('repository/delete/reply', (event, response) => {
		if (response.error) return swal('Deu ruim', response.error, 'error');
	})
}

