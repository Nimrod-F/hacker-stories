import React from 'react';
import style from './App.module.css';

const Search = ({ id, type, value, onInputChange, children, isFocused }) => {
  return (
    <>
      <label className={style.label} htmlFor={id}>
        {children}
      </label>
      &nbsp;
      <input
        className={style.input}
        id={id}
        type={type}
        value={value}
        autoFocus={isFocused}
        onChange={(event) => onInputChange(event)}
      />
    </>
  );
};

export default Search;
