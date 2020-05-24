import styled from 'styled-components';
import { getColor } from 'get-color-sm';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Header = styled.header`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;

	& > svg {
		stroke-width: 3px;
		background: #7159c1;
		padding: 7.5px;
		border-radius: 50%;
		margin-bottom: 5px;
		cursor: pointer;
		transition: border-radius .2s;
	}

	& > svg:hover {
		border-radius: 10%;
	}
`;

export const Name = styled.h1`
	color: #fafafa;
	font-size: 28px;
	font-family: 'Roboto', sans-serif;
`;

export const Body = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 15px;
	width: 90%;
	margin-bottom: 25px;
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 15px;
	width: 100%;
	padding: 10px;
	background: #4f4f4f;
	border-radius: 5px;
	filter: brightness(90%);
`;

export const ContainerButtons = styled.nav`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(${(props) => props.grid}, 1fr);
	gap: 5px;
	margin: 5px 0;
`;

export const ButtonFunction = styled.button`
	color: #333;
	font-size: 16px;
	font-weight: bold;
	font-family: 'Roboto', sans-serif;
	outline: 0;
	border: 0;
	width: 100%;
	height: 65px;
	border-radius: 2px;
	cursor: pointer;
	transition: filter .2s, color .2s;

	&:hover {
		filter: brightness(90%);
	}

	&:active {
		filter: brightness(120%);
		color: #fafafa;
	}

	${(props) => {
		return props.color ? `background: ${props.color}` : 'background: #7159c1;'
	}}
`;

export const ContainerConsole = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #4f4f4f;
	border-radius: 5px;
	filter: brightness(90%);
	width: 100%;
	margin-top: 20px;
	border-top: 5px solid #${getColor()};
`;

export const Console = styled.div`
	width: 98%;
	height: 300px;
	background: #22222280;
`;

export const Command = styled.p`
	font-size: 16px;
	color: #fafafa;
	margin: 7.5px;

	&::before {
		content: "${(props) => props.system
		? '[System] '
		: '[Log] '}";
		font-weight: bold;
		font-family: 'Roboto', sans-serif;
	}
`;
