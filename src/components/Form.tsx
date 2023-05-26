import { useState } from 'react';

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

  const { item, price } = formData;

  const postDataToServer = async () => {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    await fetch('/api/grocery-list/item', request)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const onChangeForNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.id]: parseFloat(e.target.value) }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postDataToServer();
    setFormData(defaultFormData);
    setGroceryItem(defaultFormData);
  };

  return (
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
  );
};
