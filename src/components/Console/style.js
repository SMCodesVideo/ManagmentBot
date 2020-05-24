import styled from 'styled-components';
import { getColor } from 'get-color-sm';

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

export const ConsoleStyled = styled.div`
	width: 100%;
`;