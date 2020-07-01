import styled from "styled-components";

export const SelectorContainer = 
styled.div`
  margin: 1em auto;
  display: flex;
  justify-content: space-around;
  width: 70%;
`;

export const Selector = 
styled.select`
  margin: 0;
  font-size: 1.6em;
  width: 13em;
  height: 2em;
  text-align-last: center;
  background-color: rgb(28,160,209);
  color: white;
  border-radius: 20px;
  border: 0;
  outline: none;
  transition: transform 0.1s ease-in;
  &:hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;