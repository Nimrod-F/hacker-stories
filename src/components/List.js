import Item from './Item';
const List = ({ data, onRemoveItem }) => (
  <div>
    {data.map((el) => (
      <Item key={el.objectID} item={el} onRemove={onRemoveItem} />
    ))}
  </div>
);

export default List;
