import React from "react";
import { getMovies } from '../services/ghibliapi';

// Hook for movies
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

export default useMovies;