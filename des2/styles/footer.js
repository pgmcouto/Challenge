import styled from "styled-components";

export const ContentBox = 
styled.div`
  min-height: calc(100vh - 15em);
`;

export const FooterBox = 
styled.footer`
  height: 4em;
  background-color: rgb(28,160,209);
  display: flex;
  justify-content: flex-end;
  `;

export const FooterText = 
styled.p`
  color: white;
  text-align: right;
  margin: 1.2em 2em 0 0;
  font-weight: 400;
`;