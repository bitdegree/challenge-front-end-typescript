import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    background-color: #1e1c31;
}

h1,h2,p{
    color: white;
}

h1{
    font-weight: 500;
}

h2{
font-weight: 500;
font-size: 1.5rem;
}

p{
    font-size: 1.2rem;
    font-weight: 100;
}

a{
    text-decoration: none;
    font-size: 1.2rem;
    color: #629cdf;
}

a:hover{
    text-decoration: underline;
}

label, input{
    font-size: 1.2rem;
}

textarea{
    font-size: 1rem;
}
`;
export default GlobalStyle;
