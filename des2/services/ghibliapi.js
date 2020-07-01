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

export const fetchPeople = () => fetch("https://ghibliapi.herokuapp.com/people").then(response => response.json());

export const fetchMovies = () => fetch("https://ghibliapi.herokuapp.com/films").then(response => response.json());

export const getMovies = () => {
  return Promise.all([fetchMovies(), fetchPeople()])
    .then(([movies, people]) => insertPeopleOnMovies(movies, people));
}
