import React, { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import { Card } from "primereact/card";

const AllProducts = () => {
  const { products, loading, error, fetchPublicProducts } = useProductStore();

  useEffect(() => {
    fetchPublicProducts();
  }, []);

  return (
    <div className="p-4">
      {loading && (
        <div
          className="flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {products.length === 0 && !loading ? (
        <div className="text-center mt-5">
          <p>No products available right now</p>
        </div>
      ) : (
        <>
          <h2 className="text-center text-2xl mb-4">All Products</h2>

          <div className="grid">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-12 sm:col-6 md:col-4 lg:col-3"
              >
                <Card
                  title={product.name}
                  subTitle={`Price: $${product.price}`}
                  className="mb-4 shadow-2 border-round"
                >
                  <p className="m-0">{product.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
