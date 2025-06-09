import { JSX } from "react";

function Header(): JSX.Element {
  return (
    <header className="bg-light py-4 shadow-sm header">
      <div className="container d-flex justify-content-center align-items-start">
        <img src="/prixio.png" alt="Logo" className="logo-img me-3 mt-1" />
        <div>
          <h1 className="display-3 fw-bold mb-1 text-dark">Prixio</h1>
          <p className="lead text-dark mb-0">
            Comparez les prix des produits de supermarché pour économiser&nbsp;!
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
