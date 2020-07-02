import React from "react";
import styled from "styled-components";
import Container from "./Container";

// Stylings...
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  line-height: 1em;
`;

const CardTitle = styled.h1`
  margin: 0;
  padding: 0;
  line-height: 1em;
  font-size: 48px;
  color: rgb(28,160,209);
`;

const CardScore = styled.div`
  margin: 0;
  font-size: 60px;
  padding: 0.2em;
  line-height: 1em;
  color: white;
  background-color: rgb(28,160,209);
  border-radius: 20px;
  span {
    position: relative;
    top: -3px;
  }
`;

const CardDescription = styled.p`
  margin: 0.5em 0 0 0.3em;
  font-size: 18px;
  color: rgb(111,135,142);
  text-align: justify;
`;

const CardDirector = styled.span`
  margin: 0;
  font-size: 22px;
  color: rgb(28,160,209);
  // line-height: 1.2em;
  padding: 0;
  margin: 0;
`;

const CardRelease = styled.span`
  margin: 0;
  font-size: 22px;
  color: rgb(28,160,209);
  // line-height: 1.2em;
  padding: 0;
  margin: 0;
`;

const CardPeople = styled.p`
  color: rgb(131,160,167);
  font-size: 16px;
  margin: 0.5em 0 0 0.3em;
`;

const writePeople = (people) => {
  if (people.length == 0){
    return ('No characters registered on the API!');
  }
  else {
    return(people.join(', '));
  }
}

// Sets up card structure. Basic element of the app.
const Card = ({ title, description, score, director, release_date, people }) => 
(
  <Container>
    <CardHeader>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <CardTitle>{title}</CardTitle>
        <p style={{margin: '0 0 0 0.2em', fontSize:'22px', color:'rgb(28,160,209)', marginLeft: '0.2em'}}>
          <CardDirector> Director: {director} </CardDirector>
          {" | "}
          <CardRelease> Release Date: {release_date} </CardRelease>
        </p>
      </div>
      <CardScore><span>{score}</span></CardScore>
    </CardHeader>
    <CardPeople>Characters: {writePeople(people)} </CardPeople>
    <CardDescription>{description}</CardDescription>
  </Container>
);


export default Card;
