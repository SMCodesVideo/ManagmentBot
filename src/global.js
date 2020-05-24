import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html, body {
		background: #4f4f4f;
	}

	::-webkit-scrollbar {
		width: 5px;
		background: #333;
	}
	::-webkit-scrollbar-thumb {
		background: #fafafa;
		border-radius: 2.5px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #666;
	}
`;
