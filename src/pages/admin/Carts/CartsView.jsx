import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checking } from "../../../components/Checking";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import '../AdminMainPage.css';
import { getAllCarts } from "../../../helpers/carts/getAllCarts";

let emptyCoupon = {
  name: "",
  description: "",
  stock: "",
  price: "",
  category: null,
};

export const CartsView = () => {

  const [coupons, setCoupons] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [couponDialog, setCouponDialog] = useState(false);
  const [deleteCouponDialog, setDeleteCouponDialog] = useState(false);
  const [deleteCouponsDialog, setDeleteCouponsDialog] = useState(false);
  const [coupon, setCoupon] = useState(emptyCoupon);
  const [selectedCoupons, setSelectCoupons] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, serCategories] = useState();

  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCoupons();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);


  const createCoupon = async (coupon) => {
    // const responsePostCoupon = await Promise.resolve(postCoupon(coupon));
    // return responsePostCoupon;
  };

  const updateCoupon = async (coupon) => {
    // const responsePutCoupon = await Promise.resolve(putCoupon(coupon));
    // return responsePutCoupon;
  };

  const removeCoupon = async (couponId) => {
    // const responseDeleteCoupon = await Promise.resolve(deleteCoupon(couponId));
    // return responseDeleteCoupon;
  };

  const getCategories = async () => {
    // const responseCategories = await Promise.resolve(getAllCategories());
    // serCategories(responseCategories);
    setIsLoading(false);
  };

  const getCoupons = async () => {
    const responseCoupons = await Promise.resolve(getAllCarts());
    setCoupons(responseCoupons);
    setIsLoading(false);
  };

  const openNew = () => {
    setCoupon(emptyCoupon);
    setSubmitted(false);
    setCouponDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setCouponDialog(false);
  };

  const hideDeleteCouponDialog = () => {
    setDeleteCouponDialog(false);
  };

  const hideDeleteCouponsDialog = () => {
    setDeleteCouponsDialog(false);
  };
  const saveCoupon = async () => {
    setSubmitted(true);

    if (coupon.name.trim()) {
      let _coupons = [...coupons];
      let _coupon = { ...coupon };
      if (coupon.id) {
        const responsePutCoupon = updateCoupon(_coupon);
        if (responsePutCoupon) {
          const index = findIndexById(coupon.id);
          _coupons[index] = _coupon;
          toast.current.show({
            severity: "success",
            summary: "Genial!",
            detail: "Coupono actualizado",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Algo salio mal!",
            detail: "No se pudo actualizar el cliente",
            life: 3000,
          });
        }
      } else {
        const responsePostCoupon = await createCoupon(_coupon);
        if (responsePostCoupon) {
          _coupon.id = responsePostCoupon.id;
          _coupons.push(_coupon);
          toast.current.show({
            severity: "success",
            summary: "Genial!",
            detail: "Coupono creado",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Algo salio mal!",
            detail: "No se pudo crear el cliente",
            life: 3000,
          });
        }
      }

      setCoupons(_coupons);
      setCouponDialog(false);
      setCoupon(emptyCoupon);
    }
  };

  const editCoupon = (coupon) => {
    setCoupon({ ...coupon });
    setCouponDialog(true);
  };

  const confirmDeleteCoupon = (coupon) => {
    setCoupon(coupon);
    setDeleteCouponDialog(true);
  };

  const deleteCouponView = () => {
    const responseDeleteCoupon = removeCoupon(coupon.id);
    if (responseDeleteCoupon) {
      let _coupons = coupons.filter((val) => val.id !== coupon.id);
      setCoupons(_coupons);
      setDeleteCouponDialog(false);
      setCoupon(emptyCoupon);
      toast.current.show({
        severity: "success",
        summary: "Eliminado!",
        detail: "Coupono eliminado",
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Algo salio mal!",
        detail: "No se pudo eliminar el cliente",
        life: 3000,
      });
    }
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < coupons.length; i++) {
      if (coupons[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const confirmDeleteSelected = () => {
    setDeleteCouponsDialog(true);
  };

  const deleteSelectedCoupons = () => {
    let _coupons = coupons.filter((val) => !selectedCoupons.includes(val));
    setCoupons(_coupons);
    setDeleteCouponsDialog(false);
    setSelectCoupons(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Coupons Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _coupon = { ...coupon };
    _coupon[`${name}`] = val;

    setCoupon(_coupon);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Añadir"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedCoupons || !selectedCoupons.length}
        />
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editCoupon(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteCoupon(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Administrar Cupones</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );
  const couponDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveCoupon}
      />
    </>
  );
  const deleteCouponDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteCouponDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteCouponView}
      />
    </>
  );
  const deleteCouponsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteCouponsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedCoupons}
      />
    </>
  );

  return (
    <>
    {
      isLoading ? (
      <Checking />
    ) : (
      <div className="datatable-crud-demo">
        <Toast ref={toast} />
  
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
  
          <DataTable
            ref={dt}
            value={coupons}
            selection={selectedCoupons}
            onSelectionChange={(e) => setSelectCoupons(e.value)}
            dataKey="id"
            paginator
            rows={8}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="{first} - {last} de {totalRecords} cupones"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "1rem" }}
              exportable={false}
            ></Column>
            <Column
              field="id"
              header="Id"
              sortable
              style={{ minWidth: "1rem" }}
            ></Column>
            <Column
              field="type"
              header="Tipo"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="quantity"
              header="Cantidad"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="code"
              header="Código"
              sortable
              style={{ minWidth: "0.5rem" }}
            ></Column>
            <Column
              field="status"
              header="Estado del cupón"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="created"
              header="Fecha de creación"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              header="Acciones"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>
  
        <Dialog
          visible={couponDialog}
          style={{ width: "450px" }}
          header="Información de la coupon"
          modal
          className="p-fluid"
          footer={couponDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="couponName">Coupon name</label>
            <InputText
              id="couponName"
              value={coupon.name}
              onChange={(e) => onInputChange(e, "couponName")}
              required
              autoFocus
              className={classNames({ "p-invalid": submitted && !coupon.couponName })}
            />
            {submitted && !coupon.name && (
              <small className="p-error">El Coupon name es obligatorio.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="stock">Stock</label>
            <InputText
              id="stock"
              value={coupon.stock}
              onChange={(e) => onInputChange(e, "stock")}
              className={classNames({
                "p-invalid": submitted && !coupon.stock,
              })}
            />
            {submitted && !coupon.stock && (
              <small className="p-error">El Stock es obligatoria.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="photoUrl">Foto</label>
            <InputTextarea
              id="photoUrl"
              value={coupon.photoUrl}
              onChange={(e) => onInputChange(e, "photoUrl")}
              required
              rows={3}
              cols={20}
              className={classNames({
                "p-invalid": submitted && !coupon.photoUrl,
              })}
            />
            {submitted && !coupon.photoUrl && (
              <small className="p-error">La Foto es obligatoria es obligatoria.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="description">Descripción</label>
            <InputTextarea
              id="description"
              value={coupon.description}
              onChange={(e) => onInputChange(e, "description")}
              required
              rows={3}
              cols={20}
              className={classNames({
                "p-invalid": submitted && !coupon.description,
              })}
            />
            {submitted && !coupon.description && (
              <small className="p-error">La descripción es obligatoria.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="category">Categoria</label>
            <Dropdown
              value={coupon.category}
              required
              options={categories}
              onChange={(e) => onInputChange(e, "category")}
              optionLabel="name"
              placeholder="Selecciona la categoría"
            />
            {submitted && !coupon.category && (
              <small className="p-error">La categoria es obligatoria.</small>
            )}
          </div>
        </Dialog>
  
        <Dialog
          visible={deleteCouponDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteCouponDialogFooter}
          onHide={hideDeleteCouponDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {coupon && (
              <span>
                Estas seguro que quiere eliminar: <b>{coupon.name}</b>?
              </span>
            )}
          </div>
        </Dialog>
  
        <Dialog
          visible={deleteCouponsDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteCouponsDialogFooter}
          onHide={hideDeleteCouponsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {coupon && (
              <span>
                Estas seguro que deseas eliminar los cupones seleccionadas?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    )
    }
    </>
  )
}
