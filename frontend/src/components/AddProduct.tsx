import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState, JSX } from "react";

import {Product} from "../types";

function AddProduct({
  name
}: Readonly<{ name: string }>): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const ean = formData.get("ean") as string;
    const name = formData.get("name") as string;
    const brand = formData.get("brand") as string;
    let quantity = Number(formData.get("quantity") as string);
    let unit = formData.get("unit") as string;
    switch (unit) {
      case "L": {
        quantity *= 1000;
        unit = "ml";
        break;
      }
      case "kg": {
        quantity *= 1000;
        unit = "g";
        break;
      }
    }
    unit = unit.toUpperCase();

    const newProduct: Product = {
      ean: ean,
      name: name,
      brand: brand,
      quantity: quantity,
      unit: unit
    }

    const recordRes = await fetch(
      `${process.env.REACT_APP_API_URL ?? ""}/product`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      }
    );

    setLoading(false);

    if (!recordRes.ok) {
      return;
    }
  };

  return (
    <>
      <button
          type="button"
          className="btn btn-primary text-dark text-nowrap fw-bold rounded-pill px-4 py-2 ml-2"
          data-bs-toggle="modal"
          data-bs-target="#formModal"
      >
        <AddCircleOutlineIcon className="me-1" />
        Ajouter "{name}"
      </button>
      <div className="modal fade" id="formModal" tabIndex={-1} aria-labelledby="formModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content bg-light">
            <form
              onSubmit={(e): void => {
                void handleSubmit(e);
              }}
            >
              <div className="modal-header border-0">
                <h5 className="modal-title text-dark fw-bold" id="formModalLabel" >
                  Nouveau produit
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Fermer"
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="ean" className="form-label text-dark">
                    EAN (code barres)
                  </label>
                  <input
                      id="ean"
                      name="ean"
                      type="text"
                      className="form-control rounded-pill"
                      required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-dark">
                    Nom
                  </label>
                  <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control rounded-pill"
                      required
                      defaultValue={name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="brand" className="form-label text-dark">
                    Marque
                  </label>
                  <input
                      id="brand"
                      name="brand"
                      type="text"
                      className="form-control rounded-pill"
                      required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label text-dark">
                    Quantité
                  </label>
                  <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      step="1"
                      className="form-control rounded-pill"
                      required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="unit" className="form-label text-dark">
                    Unité
                  </label>
                  <select
                      id="unit"
                      name="unit"
                      className="form-control rounded-pill"
                      required
                  >
                    <option>g</option>
                    <option>kg</option>
                    <option>ml</option>
                    <option>L</option>
                    <option>pcs</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill px-3"
                  data-bs-dismiss="modal"
                  disabled={loading}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-dark fw-bold rounded-pill px-4"
                  data-bs-dismiss="modal"
                  disabled={loading}
                >
                  {loading ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
