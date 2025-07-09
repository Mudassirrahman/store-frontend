// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { useProductStore } from "../store/productStore";

const AdminDashboard = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSubmit = (data) => {
    if (editMode) {
      updateProduct(editId, data);
      setEditMode(false);
      setEditId(null);
    } else {
      addProduct(data);
    }
    reset();
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditId(product._id);
    setValue("name", product.name);
    setValue("description", product.description);
    setValue("price", product.price);
  };

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button label="Edit" onClick={() => handleEdit(rowData)} />
      <Button
        label="Delete"
        severity="danger"
        onClick={() => deleteProduct(rowData._id)}
      />
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      <Card title={editMode ? "Edit Product" : "Add Product"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-6"
        >
          <span className="p-float-label w-full" style={{ marginBottom: "1.5rem" }}>
            <InputText
              id="name"
              {...register("name", { required: "name is required" })}
              className={errors.name ? "p-invalid" : ""}
            />
            <label htmlFor="name">Title</label>
          </span>

          <span className="p-float-label w-full" style={{ marginBottom: "1.5rem" }}>
            <InputText
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className={errors.description ? "p-invalid" : ""}
            />
            <label htmlFor="description">Description</label>
          </span>

          <span className="p-float-label w-full" style={{ marginBottom: "1.5rem" }}>
            <InputText
              id="price"
              {...register("price", { required: "Price is required" })}
              className={errors.price ? "p-invalid" : ""}
            />
            <label htmlFor="price">Price</label>
          </span>

          <Button
            type="submit"
            label={editMode ? "Update" : "Add"}
            className="col-span-1 md:col-span-3"
          />
        </form>
      </Card>

      <Card title="All Products">
        <DataTable value={products} paginator rows={5} loading={loading}>
          <Column field="name" header="Name" />
          <Column field="description" header="Description" />
          <Column field="price" header="Price" />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>
        {error && <small className="p-error">{error}</small>}
      </Card>
    </div>
  );
};

export default AdminDashboard;
