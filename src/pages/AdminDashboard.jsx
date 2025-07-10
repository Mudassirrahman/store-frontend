import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
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
  const [visible, setVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Add Product");

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
    setVisible(false); // Close popup after submit
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditId(product._id);
    setDialogTitle("Edit Product");
    setValue("name", product.name);
    setValue("description", product.description);
    setValue("price", product.price);
    setVisible(true);
  };

  const actionTemplate = (rowData) => (
    <div className="flex align-items-center gap-2">
      <Button label="Edit" onClick={() => handleEdit(rowData)} />
      <Button
        label="Delete"
        severity="danger"
        onClick={() => deleteProduct(rowData._id)}
      />
    </div>
  );

  return (
    <div className="p-4">
      <Card title="Product Management">
        <div className="mb-3">
          <Button
            label="Add Product"
            icon="pi pi-plus"
            onClick={() => {
              setDialogTitle("Add Product");
              setEditMode(false);
              reset();
              setVisible(true);
            }}
          />
        </div>

        <DataTable value={products} paginator rows={5} loading={loading} className="mb-3">
          <Column field="name" header="Name" />
          <Column field="description" header="Description" />
          <Column field="price" header="Price" />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>

        {error && <small className="p-error">{error}</small>}
      </Card>

      {/* Dialog Popup for Add/Edit */}
      <Dialog
        header={dialogTitle}
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
        breakpoints={{ '960px': '90vw' }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="formgrid grid mt-2">
          <div className="field col-12">
            <span className="p-float-label mt-5">
              <InputText
                id="name"
                {...register("name", { required: "name is required" })}
                className={errors.name ? "p-invalid w-full" : "w-full"}
              />
              <label htmlFor="name">Title</label>
            </span>
          </div>

          <div className="field col-12">
            <span className="p-float-label mt-3">
              <InputText
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className={errors.description ? "p-invalid w-full" : "w-full"}
              />
              <label htmlFor="description">Description</label>
            </span>
          </div>

          <div className="field col-12">
            <span className="p-float-label mt-3">
              <InputText
                id="price"
                {...register("price", { required: "Price is required" })}
                className={errors.price ? "p-invalid w-full" : "w-full"}
              />
              <label htmlFor="price">Price</label>
            </span>
          </div>

          <div className="col-12 mt-2">
            <Button
              type="submit"
              label={editMode ? "Update" : "Add"}
              className="w-full"
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
