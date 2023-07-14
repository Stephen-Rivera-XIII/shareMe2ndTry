import React, { useState, useEffect } from 'react';
import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';
import { debounce } from 'lodash';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchPins = debounce((term) => {
    setLoading(true);
    const query = searchQuery(term.toLowerCase());
    client.fetch(query).then((data) => {
      setPins(data);
      setLoading(false);
    });
  }, 500); // Adjust the debounce delay as needed (e.g., 500 milliseconds)

  useEffect(() => {
    if (searchTerm) {
      searchPins(searchTerm);
    } else {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching for pins..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl">
          No pins found, but check these out!
        </div>
      )}
    </div>
  );
};

export default Search;
