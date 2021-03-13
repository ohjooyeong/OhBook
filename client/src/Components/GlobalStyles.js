import { createGlobalStyle } from "styled-components";

import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
	${reset};
	a{
		text-decoration: none;
		color: inherit;
	}
	*{
		box-sizing: border-box;
	}
	body {
		font-family: 'Noto Sans KR', sans-serif;
		font-size: 14px;
		color: black;
		padding-top: 60px;
		width: 100%;
		height:100%;
		max-width: 1400px;
		margin: 0 auto;
	}
`;

export default GlobalStyles;
