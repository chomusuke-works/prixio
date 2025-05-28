
function AddObservation() {
    return (
        <>
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#formModal">
                Ajouter une observation
            </button>
            <div className="modal fade" id="formModal" tabIndex={-1} aria-labelledby="formModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h5 className="modal-title" id="formModalLabel">Nouvelle observation</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Fermer"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="supermarche" className="form-label">Supermarché</label>
                                    <input type="text" className="form-control" id="supermarche" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="prix" className="form-label">Prix (CHF)</label>
                                    <input type="number" step="0.05" className="form-control" id="prix" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input type="date" className="form-control" id="date" required/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button type="submit" className="btn btn-primary">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddObservation;