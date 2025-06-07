import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState, JSX } from "react";


function AddObservation({ supermarketList }: Readonly<{ supermarketList: string[] }>): JSX.Element {
  const [selectedSupermarket, setSelectedSupermarket] = useState("");
  const [showNewSupermarketInput, setShowNewSupermarketInput] = useState(false);
  const [newSupermarket, setNewSupermarket] = useState("");

  const handleSupermarketChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;
    setSelectedSupermarket(value);
    setShowNewSupermarketInput(value === "__add_new__");
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
              <form>
                <div className="modal-header border-0">
                  <h5 className="modal-title text-dark fw-bold" id="formModalLabel">
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
                    <label htmlFor="supermarche" className="form-label text-dark">
                      Sélectionner un supermarché
                    </label>
                    <select
                        className="form-control rounded-pill"
                        id="supermarche"
                        required
                        value={selectedSupermarket}
                        onChange={handleSupermarketChange}
                    >
                      {Array.isArray(supermarketList) &&
                          supermarketList.map((supermarket: string) => (
                              <option key={supermarket} value={supermarket}>
                                {supermarket}
                              </option>
                          ))}
                      <option value="__add_new__">Ajouter un nouveau supermarché…</option>
                    </select>
                    {showNewSupermarketInput && (
                        <input
                            type="text"
                            className="form-control rounded-pill mt-2"
                            placeholder="Nom du nouveau supermarché"
                            value={newSupermarket}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setNewSupermarket(e.target.value)}
                            required
                        />
                    )}
                  </div>
                <div className="mb-3">
                  <label htmlFor="prix" className="form-label text-dark">
                    Prix (CHF)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    className="form-control rounded-pill"
                    id="prix"
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
                    required
                  />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill px-3"
                  data-bs-dismiss="modal"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-dark fw-bold rounded-pill px-4"
                >
                  {/* TODO : Appel API pour ajouter le produit à partie du formulaire. Vérifier s'il faut aussi ajouter un nouveau supermarché */}
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddObservation;
