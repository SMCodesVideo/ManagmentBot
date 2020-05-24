import styled from 'styled-components';

export const InputStyled = styled.input`
	width: 150px;
	height: 28px;
	color: #333;
	border-radius: 5px;
	border: 1px solid #333;
	transition: border .2s;
	outline: 0;
	padding: 5px;

	&:focus {
		border: 1px solid #61DAFB;
		box-shadow: 0 0 4px #61DAFB;
	}
`;
