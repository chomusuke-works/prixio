function Footer() {
    return (
        <footer className="text-center py-4 bg-light">
            <small className="text-dark" style={{ fontFamily: "'Nunito', Arial, sans-serif" }}>
                &copy; {new Date().getFullYear()} Prixio — Trouvez les meilleurs prix, tout simplement.
            </small>
        </footer>
    );
}

export default Footer;