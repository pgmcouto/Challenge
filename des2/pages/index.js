import React from "react";
import styled from "styled-components";
import Head from 'next/head'
import Card from "../components/Card/index";
import useDirectors from "../hooks/useDirectors";
import useMovies from "../hooks/useMovies";
import useReleaseDates from '../hooks/useReleaseDates';
import useMovieFilters from '../hooks/useMovieFilters';
import { HeaderText } from '../styles/header';
import { Logo } from '../styles/header';
import { HeaderTextBox } from '../styles/header';
import { Header } from '../styles/header';
import { GhibliLink } from '../styles/header';
import { LoadingDiv } from '../styles/loading';
import { LoadingImg } from '../styles/loading';
import { CardList } from '../styles/cardList';
import { CardListItem } from '../styles/cardList';
import { Selector } from '../styles/selector';
import { SelectorContainer } from '../styles/selector';
import { ContentBox } from '../styles/footer';
import { FooterBox } from '../styles/footer';
import { FooterText } from '../styles/footer';


// Styles message for filter parameters that return no movies
const BlankMessage = styled.div`
  color: rgb(28,160,209);
  min-width: 100%;
  text-align: center;
  margin-top: 2em;
`;

// Creates a list with character names from the character info arrays
const getPeopleOnCard = (movie) => {
  const peopleList = []
    movie.people.forEach(singlePerson => {
        peopleList.push(singlePerson['name']);
      })
  return peopleList;
}

// Renders page
const IndexPage = () => {
  const [movies, loading] = useMovies();

  const directors = useDirectors(movies);
  const releaseDates = useReleaseDates(movies);

  const [filteredMovies, setFilters] = useMovieFilters(movies);

  const handleChange = ev => {
    const target = ev.currentTarget;

    setFilters(oldState =>
      Object.assign({}, oldState, { [target.name]: target.value })
    );
  };

  if (loading) { return (<LoadingDiv><LoadingImg id='tot_log' src='totologo.png'></LoadingImg>Loading!</LoadingDiv>) }
  return (
  <div>
    <Head>
      <title>The Ghibli Database</title>
      <link rel="icon" href="/anime.png"/>
    </Head>

    <div>
      <Header>
        <HeaderTextBox>
          <div>
            <HeaderText>The Ghibli</HeaderText>
          </div>
          <div>
            <HeaderText>database</HeaderText>
          </div>
        </HeaderTextBox>
        <GhibliLink><Logo src='logo.jpg'></Logo></GhibliLink>
      </Header>
      <ContentBox>
        <SelectorContainer>

          <Selector name="director" onChange={handleChange}>
            <option value=''>Directors</option>
            {directors.map(director => (
              <option value={director}>{director}</option>
            ))}
          </Selector>

          <Selector name="release_date" onChange={handleChange}>
            <option value=''>Release Date</option>
            {releaseDates.map(releaseDate => (
              <option value={releaseDate}>{releaseDate}</option>
            ))}
          </Selector>

        </SelectorContainer>   

        <CardList>
          {filteredMovies.length > 0 ? (
            filteredMovies.map(movie => (
              <CardListItem key={movie.id}>
                <Card
                  title={movie.title}
                  director={movie.director}
                  release_date={movie.release_date}
                  description={movie.description}
                  score={movie.rt_score}
                  people={getPeopleOnCard(movie)}          
                />
              </CardListItem>
            ))
          ) : (
              <BlankMessage>There are no movies by this Director in this year.<br/><img src='noface.png'></img></BlankMessage>
            )}
        </CardList>
        
      </ContentBox>
      <FooterBox><FooterText>Pedro Couto, 2020</FooterText></FooterBox>
    </div>
  </div>
  );
};

export default IndexPage;
