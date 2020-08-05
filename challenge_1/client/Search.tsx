import * as React from 'react';
import { FC } from 'react';
import { SearchCtn } from './styles';

interface Props {
  searchPhrase: string;
  handleSearchChange: (e: React.ChangeEvent) => void;
  resetSearch: () => void;
}

const Search:FC<Props> = ({ searchPhrase, handleSearchChange, resetSearch }) => {

  return (
    <SearchCtn>
      <label htmlFor="search">Find an event: </label>
      <input
        type="text"
        id="search"
        autoComplete="off"
        value={searchPhrase}
        onChange={handleSearchChange}
        onFocus={resetSearch}
      />
    </SearchCtn>
  );
}

export default Search;
