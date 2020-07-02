// Merges the characters into the movies after fetching both infos
const insertPeopleOnMovies = (initialMovies, people) => {
  const movies = initialMovies.map(movie => Object.assign({}, movie, {people: []}));

  people.forEach(person => {
    person.films.forEach(movieEndpoint => {
      const movieId = movieEndpoint.split('/').pop();
      
      const movieIndex = movies.findIndex(item => item.id === movieId);
      
      if(movieIndex !== -1) {
        movies[movieIndex].people.push(person);
      }
    })
  });

  return movies;
};

// Simple fetch for characters
export const fetchPeople = () => fetch("https://ghibliapi.herokuapp.com/people").then(response => response.json());

// Simple fetch for movies
export const fetchMovies = () => fetch("https://ghibliapi.herokuapp.com/films").then(response => response.json());

// Handles simultaneous promises from both fetches
export const getMovies = () => {
  return Promise.all([fetchMovies(), fetchPeople()])
    .then(([movies, people]) => insertPeopleOnMovies(movies, people));
}
