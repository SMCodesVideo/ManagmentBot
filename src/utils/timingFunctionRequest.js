let executing = false;

function startExecution() {
	executing = true;
}

function stopExecution() {
	executing = false;
}

function verifyExecuting() {
	return executing;
}

module.exports = {
	startExecution,
	verifyExecuting,
	stopExecution
};

