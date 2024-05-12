import React, { useState } from 'react';

export const ProductsList = ({ data, onUpdate, onDelete }) => {
  const [editProductId, setEditProductId] = useState(null);
  const [editedProductName, setEditedProductName] = useState('');

  const handleEditClick = (id, name) => {
    setEditProductId(id);
    setEditedProductName(name);
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
    setEditedProductName('');
  };

  const handleSaveEdit = async () => {
    await onUpdate(editProductId, { name: editedProductName });
    setEditProductId(null);
    setEditedProductName('');
  };

  const handleDeleteClick = async (id) => {
    await onDelete(id);
  };

  return (
    <>
      {data.length ? (
        <div className="products">
          <h3>Products list</h3>
          <ul className="products__list">
            {data.map(item => (
              <li key={item.id} className="products__item">
                {editProductId === item.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedProductName}
                      onChange={e => setEditedProductName(e.target.value)}
                    />
                    <button className="btn" onClick={handleSaveEdit}>Save</button>
                    <button className="btn" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <p className="products__text">{item.name}</p>
                    <button className="btn" onClick={() => handleEditClick(item.id, item.name)}>Edit</button>
                    <button className="btn" onClick={() => handleDeleteClick(item.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3>No products !!!</h3>
      )}
    </>
  );
};

