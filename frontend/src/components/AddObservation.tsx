function AddObservation() {
    return (
        <>
            <button
                type="button"
                className="btn btn-primary text-dark fw-bold rounded-pill px-4 py-2 mb-2"
                data-bs-toggle="modal"
                data-bs-target="#formModal"
            >
                Ajouter une observation
            </button>
            <div className="modal fade" id="formModal" tabIndex={-1} aria-labelledby="formModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-light">
                        <form>
                            <div className="modal-header border-0">
                                <h5 className="modal-title text-dark fw-bold" id="formModalLabel">
                                    Nouvelle observation
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="supermarche" className="form-label text-dark">Supermarché</label>
                                    <input type="text" className="form-control rounded-pill" id="supermarche" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="prix" className="form-label text-dark">Prix (CHF)</label>
                                    <input type="number" step="0.05" className="form-control rounded-pill" id="prix" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label text-dark">Date</label>
                                    <input type="date" className="form-control rounded-pill" id="date" required/>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button type="button" className="btn btn-secondary rounded-pill px-3" data-bs-dismiss="modal">
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary text-dark fw-bold rounded-pill px-4"
                                >
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