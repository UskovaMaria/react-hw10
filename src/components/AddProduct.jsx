import { useState } from "react";
import { useAddGoodMutation } from "../redux/goodsApi";

export const AddProduct = () => {
  const [text, setText] = useState('');
  const [addGood, { isError }] = useAddGoodMutation();

  const clickHandler = async () => {
    const goodName = text.trim();
    if (goodName) {
      await addGood({ name: goodName }).unwrap();
      console.log(isError);
      setText('');
    }

  }

  return (
    <div className="add-product">
      <input value={ text } onChange={ e => setText(e.target.value) } type="text" placeholder="Enter product name"/>
      <button className="btn" onClick={ clickHandler }>Add</button>
    </div>
  );
};