import React, { useState } from 'react';

import { FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import swal from 'sweetalert';

import { useClientSocket } from '../../contexts/client-socket';

import Input from '../../components/Input';
import Console from '../../components/Console';

import downloadedIsBot from '../../utils/downloadedIsBot';
import deleteIsBot from '../../utils/deleteIsBot';
import startedIsBot from '../../utils/startedIsBot';
import shutdownIsBot from '../../utils/shutdownIsBot';
import timingFunctions from '../../utils/timingFunctionRequest';

import {
	Container,
	Header,
	Name,
	Body,
	Buttons,
	ContainerButtons,
	ButtonFunction,
} from './style';

export default function Main() {
	const [username, setUsername] = useState('');
	const {socket, status, setStatus} = useClientSocket();

	function handleSubmit(data) {
		if(!data.username) return alert("Digite seu username antes de enviar");
		setUsername(data.username);
	}

	const executeFunctions = {
		downloadedIsBot,
		deleteIsBot,
		startedIsBot,
		shutdownIsBot
	}

	function execFunc(func) {
		const execute = executeFunctions[func];
		if (!execute) return;
		if (func === 'shutdownIsBot') {
			timingFunctions.startExecution();
			execute(socket, setStatus);
			return;
		}
		if (status || timingFunctions.verifyExecuting()) return swal("Oops!", "Você já está executando um comando.", "error");
		timingFunctions.startExecution();
		execute(socket, setStatus);
	}

	return (
		<Container>
			<Header>
				<FiUser size={50} color="fafafa" />
				{username
					? <Name>{username}</Name>
					: (
						<Form onSubmit={handleSubmit}>
							<Input
								name='username'
								type='text'
								placeholder='Digite um username.'
							/>
						</Form>
					)
				}
			</Header>
			<Body>
				<Buttons>
					<ContainerButtons grid={1}>
						<ButtonFunction
							onClick={() => execFunc('downloadedIsBot')}
						>
							Baixar BOT
						</ButtonFunction>
					</ContainerButtons>
					<ContainerButtons grid={2}>
						<ButtonFunction
							onClick={() => execFunc('startedIsBot')}
						>
							Iniciar BOT
						</ButtonFunction>
						<ButtonFunction
							onClick={() => execFunc('shutdownIsBot')}
						>
							Desligar BOT
						</ButtonFunction>
					</ContainerButtons>
					<ContainerButtons grid={1}>
						<ButtonFunction
							color='#e02041'
							onClick={() => execFunc('deleteIsBot')}
						>
							Excluir BOT
						</ButtonFunction>
					</ContainerButtons>
				</Buttons>
				<Console />
			</Body>
		</Container>
	)
}
