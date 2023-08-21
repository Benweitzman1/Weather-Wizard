import React, { useState } from 'react';

const AutocompleteSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {results.length > 0 && (
        <ul>
          {results.map((result, idx) => (
            <li key={idx} onClick={() => setSearchTerm(result)}>
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearch;