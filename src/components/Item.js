import React from 'react';
import { ReactComponent as Check } from '../check.svg';
import style from './App.module.css';

const Item = ({ item, onRemove }) => {
  return (
    console.log('Item') || (
      <div className={style.item}>
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>{item.author}</span>
        <span style={{ width: '10%' }}>{item.num_comments}</span>
        <span style={{ width: '10%' }}>{item.points}</span>
        <span style={{ width: '10%' }}>
          <button
            className={`${style.button} ${style.buttonSmall}`}
            type="button"
            onClick={() => onRemove(item)}
          >
            <Check height="18px" width="18px" />
          </button>
        </span>
      </div>
    )
  );
};
export default Item;
