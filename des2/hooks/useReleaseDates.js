import React from "react";

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

  export default useReleaseDates;