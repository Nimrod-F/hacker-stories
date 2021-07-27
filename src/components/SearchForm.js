import React from 'react';
import style from './App.module.css';
import InputField from './InputField';
const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) =>
  console.log('SearchFrom') || (
    <>
      <form onSubmit={onSearchSubmit} className={style.searchForm}>
        <InputField
          id="search"
          type="text"
          isFocused
          value={searchTerm}
          onInputChange={onSearchInput}
        >
          <strong>Search:</strong>
        </InputField>
        <button
          className={`${style.button} ${style.buttonLarge}`}
          type="submit"
          disabled={!searchTerm}
        >
          Search
        </button>
      </form>
    </>
  );

export default SearchForm;
