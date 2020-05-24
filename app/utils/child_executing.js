let child;

function start(newValue) {
	if (child) return;
	child = newValue;

	return {
		status: true,
		msg: child
	};
}

function stop() {
	if (!child) return {
		status: false,
		msg: 'O bot não está em execução.'
	};
	child = undefined;

	return {
		status: true,
		msg: child
	};
}

function get() {
	if (!child) return {
		status: false,
		msg: 'O bot não está em execução.'
	};

	return {
		status: true,
		msg: child
	}
}

module.exports = {
	start,
	stop,
	get
};

