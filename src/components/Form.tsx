import { Fragment, useState } from 'react';

interface FormFields {
  item: string;
  price: number;
}

const defaultFormData: FormFields = {
  item: '',
  price: 0
};

export const Form = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [groceryItem, setGroceryItem] = useState(defaultFormData);
  const [groceryList, setGroceryList] = useState([defaultFormData]);

  const { item, price } = formData;

  const postItem = async () => {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    await fetch('/api/grocery-list/item', request)
      .then((response) => response.json())
      .then((data) => {
        setGroceryItem(data);
        groceryList[0].item === ''
          ? setGroceryList([data])
          : setGroceryList([...groceryList, data]);
      })
      .catch((err) => console.log(err));
  };

  const handleOnClick = () => {
    groceryList[0].item !== '' && groceryList.length > 0
      ? console.log(groceryList)
      : console.log('No items yet!');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const onChangeForNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.id]: parseFloat(e.target.value) }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postItem();
    setFormData(defaultFormData);
    setGroceryItem(defaultFormData);
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <label htmlFor="item">Item</label>
        <input type="text" id="item" value={item} onChange={onChange} />
        <br />
        <br />
        <label htmlFor="price">Price</label>
        <input type="number" id="price" value={price} onChange={onChangeForNumbers} />
        <br />
        <br />
        <button type="submit">Add</button>
      </form>
      <div>
        <br />
        <button onClick={handleOnClick}>Get Grocery List</button>
      </div>
    </Fragment>
  );
};
