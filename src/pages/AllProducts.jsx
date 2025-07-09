// src/pages/AllProducts.jsx
import React, { useEffect } from "react";
import { useProductStore } from "../store/productStore";

const AllProducts = () => {
  const { products, loading, error, fetchPublicProducts } = useProductStore();

  useEffect(() => {
    fetchPublicProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Products</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
