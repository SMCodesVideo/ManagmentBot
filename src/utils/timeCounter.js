let counter = 0;

function contCounter() {
	setInterval(() => {
		if (counter !== 0) {
			counter -= 1000;
		}
	}, 1000);
}

function initializedCount(startValue) {
	if (counter <= 0) return;
	counter = startValue;
	contCounter();
}

function verifyCounter() {
	return counter;
}

module.exports = {
	contCounter,
	initializedCount,
	verifyCounter
};
