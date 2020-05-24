import React, { useEffect, useRef } from 'react';

import { Terminal } from 'xterm';

import 'xterm/css/xterm.css';

import { useClientSocket } from '../../contexts/client-socket';

import {
	ContainerConsole,
	ConsoleStyled
} from './style';

export default function Console() {
	const consoleRef = useRef(null);
	const {socket} = useClientSocket();

	useEffect(() => {
		if (!socket || !socket.on) return;
		const term = new Terminal();
		term.open(consoleRef.current);

		socket.on(
			'log/register-log',
			(event, log) => {
				term.writeln(log);
			});
		return () => {};
	}, [socket]);

	return (
		<ContainerConsole>
			<ConsoleStyled ref={consoleRef} />
		</ContainerConsole>
	)
}
