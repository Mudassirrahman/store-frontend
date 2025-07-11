import React, { useEffect, useRef } from "react";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const AllProducts = () => {
  const toast = useRef(null);
  const { products, loading, error, fetchPublicProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const { user } = useAuthStore(); 

  useEffect(() => {
    fetchPublicProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.current.show({
        severity: "warn",
        summary: "Login Required",
        detail: "Please login or register to add items to your cart.",
        life: 3000,
      });
    } else {
      addToCart(product);

      toast.current.show({
        severity: "success",
        summary: "Added to Cart",
        detail: `${product.name} has been added to your cart.`,
        life: 2000,
      });
    }
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />

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
                <Card className="mb-4 shadow-2 border-round h-full flex flex-column justify-between">
                  {product.imageBase64 && (
                    <img
                      src={`data:image/*;base64,${product.imageBase64}`}
                      alt={product.name}
                      className="w-full border-round-top"
                      style={{ maxHeight: "180px", objectFit: "cover" }}
                    />
                  )}

                  <div className="p-3">
                    <h3 className="m-0 text-lg font-semibold">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.description}
                    </p>
                    <p className="font-bold mb-3">Price: ${product.price}</p>

                    <Button
                      icon="pi pi-shopping-cart"
                      label="Add to Cart"
                      className="w-full p-button-sm"
                      onClick={() => handleAddToCart(product)}
                    />
                  </div>
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
