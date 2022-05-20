import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
body{
    @media (max-width: 1150px) {
   background:#f1f1f1;
  }
}
    * {
        margin:0;
        padding:0;
        box-sizing: border-box;
        font-family: Poppins;
    }
`;
