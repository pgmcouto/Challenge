import React from "react";

// Hook for filtered movies: composes the movie list according to selector data
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

  export default useMovieFilters;