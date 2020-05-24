import React from 'react';

import Main from './pages/Main';

import { ClientSocketProvider } from './contexts/client-socket';

import { GlobalStyle } from './global';

function App() {
  return (
		<ClientSocketProvider>
			<GlobalStyle />
			<Main />
		</ClientSocketProvider>
	)
}

export default App;
