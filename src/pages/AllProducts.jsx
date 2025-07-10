// import React, { useEffect } from "react";
// import { useProductStore } from "../store/productStore";
// import { Card } from "primereact/card";

// const AllProducts = () => {
//   const { products, loading, error, fetchPublicProducts } = useProductStore();

//   useEffect(() => {
//     fetchPublicProducts();
//   }, []);

//   return (
//     <div className="p-4">
//       {loading && <p className="text-gray-600">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {products.length === 0 && !loading ? (
//         <p className="text-center text-gray-500 text-lg mt-10">
//           No products available right now
//         </p>
//       ) : (
//         <>
//           <h2 className="text-2xl font-semibold mb-6 text-center">All Products</h2>

//          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div key={product._id} className="h-full">
//             <Card
//               title={product.name}
//               subTitle={`Price: $${product.price}`}
//               className="h-full shadow-md border border-gray-200 rounded-xl"
//             >
//               <p className="m-0 text-gray-700">{product.description}</p>
//             </Card>
//           </div>
//         ))}
//       </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AllProducts;

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
      {loading && <p className="text-gray-600">Loading...</p>}
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
              <div key={product._id} className="col-12 sm:col-6 md:col-4 lg:col-3">
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
