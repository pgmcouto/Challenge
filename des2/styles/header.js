import styled from "styled-components";

export const HeaderText =
styled.h1`
  color: white;
  font-size: 3em;
  font-family: sans-serif;
  margin: 0 0 0 0.5em;
  padding: 0;
  line-height: 0.9em;
  &:hover{
    cursor: pointer;
  }
`;

export const Logo =
styled.img`
  display: block;
  max-height: 100%;
  margin: 0 0.5em 0 0;
`;

export const HeaderTextBox =
styled.a.attrs({ href: '/' })`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
  text-decoration: none;
`;

export const Header =
styled.div`
  background-color: rgb(28,160,209);
  display: flex;
  justify-content: space-between;
  height: 10em;
  align-items: center;
`;

export const GhibliLink = 
styled.a.attrs({ href: 'https://studioghibli.com.br/' })`
  text-decoration: none;
  height: 100%;
  display: inline-block;
`;
