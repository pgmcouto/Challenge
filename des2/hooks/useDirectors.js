import React from "react";

// Retrieves the unique directors
const useDirectors = movies => {
  const [directors, setDirectors] = React.useState([]);

  React.useEffect(() => {
    const dataDirectors = movies.reduce((acc, current) => {
      if (acc.indexOf(current.director) === -1) {
        acc.push(current.director);
      }

      return acc;
    }, []);

    setDirectors(dataDirectors.sort());
  }, [movies]);

  return directors;
};

export default useDirectors;
