import axios from 'axios';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import style from './App.module.css';
import List from './List';
import SearchForm from './SearchForm';

const Actions = {
  SET_STORIES: 'SET_STORIES',
  REMOVE_STORY: 'REMOVE_STORY',
  STORIES_FETCH_INIT: 'STORIES_FETCH_INIT',
  STORIES_FETCH_SUCCESS: 'STORIES_FETCH_SUCCESS',
  STORIES_FETCH_FAILURE: 'STORIES_FETCH_FAILURE',
};

const getSumComments = (stories) => {
  return stories.data.reduce((sum, curr) => sum + curr.num_comments, 0);
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case Actions.STORIES_FETCH_INIT:
      return { ...state, isLoading: true, isError: false };
    case Actions.STORIES_FETCH_SUCCESS:
      return {
        ...state,
        isErrro: false,
        isLoading: false,
        data: action.payload,
      };
    case Actions.STORIES_FETCH_FAILURE:
      return { ...state, isError: true, isLoading: false };
    case Actions.REMOVE_STORY:
      return {
        ...state,
        data: state.data.filter(
          (el) => action.payload.objectID !== el.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const useSemiPersistentState = (key, initialState) => {
  const isMounted = useRef(false);
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');
  const [URL, setURL] = useState(`${API_ENDPOINT} ${searchTerm}`);
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const summComments = getSumComments(stories);
  const handleRemoveStory = (item) => {
    dispatchStories({
      type: Actions.REMOVE_STORY,
      payload: item,
    });
  };

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setURL(`${API_ENDPOINT} ${searchTerm}`);
  };

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: Actions.STORIES_FETCH_INIT });
    try {
      const result = await axios.get(URL);
      dispatchStories({
        type: Actions.STORIES_FETCH_SUCCESS,
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({
        type: Actions.STORIES_FETCH_FAILURE,
      });
    }
  }, [URL]);
  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);
  return (
    <div className={style.container}>
      <h1 className={style.headlinePrimary}>
        My hacking stories with {summComments} comments:
      </h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearch}
        onSearchSubmit={handleSearchSubmit}
      />
      {stories.isLoading ? (
        <div>Loading...</div>
      ) : (
        <List data={stories.data} onRemoveItem={handleRemoveStory} />
      )}
      {stories.isError && <p>Something went wrong...</p>}
    </div>
  );
};

export default App;
