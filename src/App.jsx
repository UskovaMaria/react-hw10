import React, { useState, useEffect } from 'react';
import { AddProduct } from "./components/AddProduct";
import { ProductsList } from "./components/ProductsList";
import { useGetGoodsQuery } from "./redux/goodsApi";

const App = () => {
  const { data = [], isLoading } = useGetGoodsQuery();
  const [productsData, setProductsData] = useState(data); // Створення стану та функції оновлення стану

  useEffect(() => {
    setProductsData(data); // Оновлення стану після завантаження даних
  }, [data]);

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      await fetch(`http://localhost:3001/goods/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      // Отримання оновлених даних після оновлення на сервері
      const updatedDataResponse = await fetch(`http://localhost:3001/goods`);
      const newData = await updatedDataResponse.json();

      // Оновлення стану з отриманими даними
      setProductsData(newData);

    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:3001/goods/${productId}`, {
        method: 'DELETE',
      });

      // Оновлення стану після видалення товару
      const updatedProducts = productsData.filter(product => product.id !== productId);
      setProductsData(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container">
      <h1>RTK Query</h1>

      <AddProduct />

      {
        isLoading 
          ? <h3>Loading ...</h3>
          : <ProductsList data={productsData} onUpdate={handleUpdateProduct} onDelete={handleDeleteProduct} />
      }
    </div>
  );
}

export default App;