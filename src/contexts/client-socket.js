import React, { createContext, useContext, useState, useEffect } from 'react';

import {
	stopExecution
} from '../utils/timingFunctionRequest';

const { ipcRenderer } = window;

export const ClientSocket = createContext({});

export function ClientSocketProvider({
	children
}) {
	const [socket, setSocket] = useState({});

	useEffect(() => {
		setSocket(ipcRenderer);
		ipcRenderer.on(
			'request/status',
			(statusLocate) => {
				stopExecution();
			}
		);
	}, []);

	return (
		<ClientSocket.Provider value={{
			socket,
			status: false,
			setStatus: () => {} 
		}}>
			{children}
		</ClientSocket.Provider>
	)
}

export function useClientSocket() {
	const context = useContext(ClientSocket);

	return context;
}
