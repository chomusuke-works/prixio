import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState, JSX } from "react";

import { PriceObservation, Supermarket } from "../types";

function AddObservation({
  supermarketList,
  ean,
}: Readonly<{ supermarketList: Supermarket[]; ean: string }>): JSX.Element {
  const [showNewSupermarketInput, setShowNewSupermarketInput] = useState(false);
  const [newSupermarket, setNewSupermarket] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSupermarketChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const value = e.target.value;
    setShowNewSupermarketInput(value === "__add_new__");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    if (showNewSupermarketInput && newSupermarket.trim()) {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/supermarket`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newSupermarket.trim() }),
        },
      );

      if (!res.ok) {
        setLoading(false);
        return;
      }
    }

    const formData = new FormData(e.currentTarget);
    const supermarket = formData.get("supermarket") as string;
    const price = formData.get("price") as string;
    const date = formData.get("date") as string;
    const dateArray = date.split("-").map((e) => Number(e));
    const newObservation: PriceObservation = {
      ean: ean,
      supermarket: { name: supermarket },
      date: dateArray,
      price: Number(price),
    };

    const recordRes = await fetch(
      `${process.env.REACT_APP_API_URL ?? ""}/record/${ean}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newObservation),
      },
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
        className="btn btn-primary text-dark fw-bold rounded-pill px-4 py-2 mb-2"
        data-bs-toggle="modal"
        data-bs-target="#formModal"
      >
        <AddCircleOutlineIcon className="me-1" />
        Ajouter une observation
      </button>
      <div
        className="modal fade"
        id="formModal"
        tabIndex={-1}
        aria-labelledby="formModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-light">
            <form
              onSubmit={(e): void => {
                void handleSubmit(e);
              }}
            >
              <div className="modal-header border-0">
                <h5
                  className="modal-title text-dark fw-bold"
                  id="formModalLabel"
                >
                  Nouvelle observation
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Fermer"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="supermarket" className="form-label text-dark">
                    Sélectionner un supermarché
                  </label>
                  <select
                    className="form-control rounded-pill"
                    id="supermarket"
                    name="supermarket"
                    required
                    onChange={handleSupermarketChange}
                  >
                    {Array.isArray(supermarketList) &&
                      supermarketList.map((supermarket: Supermarket) => (
                        <option value={supermarket.name}>
                          {capitalizeFirstLetter(supermarket.name)}
                        </option>
                      ))}
                    <option value="__add_new__">
                      Ajouter un nouveau supermarché…
                    </option>
                  </select>
                  {showNewSupermarketInput && (
                    <input
                      type="text"
                      className="form-control rounded-pill mt-2"
                      placeholder="Nom du nouveau supermarché"
                      value={newSupermarket}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ): void => setNewSupermarket(e.target.value)}
                      required
                    />
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label text-dark">
                    Prix (CHF)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    className="form-control rounded-pill"
                    id="price"
                    name="price"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label text-dark">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control rounded-pill"
                    id="date"
                    name="date"
                    required
                  />
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

function capitalizeFirstLetter(val: string): string {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default AddObservation;
