import React from "react";
import styled from "styled-components";
import Card from "../components/Card/index";
import useDirectors from "../hooks/useDirectors";
import { getMovies } from '../services/ghibliapi';


const HeaderText = styled.h1`
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

const Logo = styled.img`
  display: block;
  max-height: 100%;
  margin: 0 0.5em 0 0;
`;

const HeaderTextBox = styled.a.attrs({ href: '/' })`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
  text-decoration: none;
`;

const Header = styled.div`
  background-color: rgb(28,160,209);
  display: flex;
  justify-content: space-between;
  height: 10em;
  align-items: center;
`;

const CardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 80%;
`;

const CardListItem = styled.li`
  margin: 12px 0 12px 0;
`;

const SelectorContainer = styled.div`
  margin: 1em auto;
  display: flex;
  justify-content: space-around;
  width: 70%;
`;

const Selector = styled.select`
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

const ContentBox = styled.div`
  min-height: calc(100vh - 15em);
`;

const FooterBox = styled.footer`
  height: 4em;
  background-color: rgb(28,160,209);
  display: flex;
  justify-content: flex-end;
  `;

const FooterText = styled.p`
  color: white;
  text-align: right;
  margin: 1.2em 2em 0 0;
  font-weight: 400;
`;

const GhibliLink = styled.a.attrs({ href: 'https://studioghibli.com.br/' })`
  text-decoration: none;
  height: 100%;
  display: inline-block;
`;

const LoadingDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: rgb(123,213,228);
  font-size: 80px;
`;

const useReleaseDates = movies => {
  const [releaseDates, setReleaseDates] = React.useState([]);

  React.useEffect(() => {
    const dataReleaseDates = movies.reduce((acc, current) => {
      if (acc.indexOf(current.release_date) === -1) {
        acc.push(current.release_date);
      }

      return acc;
    }, []);

    setReleaseDates(dataReleaseDates.sort());
  }, [movies]);

  return releaseDates;
};


const useMovieFilters = movies => {
  const [filters, setFilters] = React.useState({});

  const [filteredMovies, setFilteredMovies] = React.useState(movies);

  React.useEffect(() => {
    const newFilteredMovies = movies.filter(movie => {
      const matchDirector = filters.director
        ? filters.director === movie.director
        : true;
      const matchReleaseDate = filters.release_date
        ? filters.release_date === movie.release_date
        : true;

      return matchDirector && matchReleaseDate;
    });

    setFilteredMovies(newFilteredMovies);
  }, [movies, filters]);

  return [filteredMovies, setFilters];
};

const useMovies = () => {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getMovies()
      .then(movies => {
        setLoading(false);
        setMovies(movies);
      });
  }, []);

  return [movies, loading];
};

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

  const getPeopleOnCard = (movie) => {
    const peopleList = []
      movie.people.forEach(singlePerson => {
          peopleList.push(singlePerson['name']);
        })
    return peopleList;
  }


  if (loading) { return (<LoadingDiv><img id='tot_log' src='totologo.png'></img>Loading!</LoadingDiv>) }
  return (
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
              <div>Nenhum filme foi encontrado</div>
            )}
        </CardList>

      </ContentBox>

      <FooterBox><FooterText>Pedro Couto, 2020</FooterText></FooterBox>

    </div>
  );
};

export default IndexPage;
