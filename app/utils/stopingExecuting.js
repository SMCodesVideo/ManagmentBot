module.exports = function stopingExecuting(reply) {
	return reply.send(
		'request/status',
		false
	);
}
