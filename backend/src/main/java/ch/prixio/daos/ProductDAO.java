package ch.prixio.daos;

import ch.prixio.datatypes.Product;
import ch.prixio.datatypes.Unit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ProductDAO extends DAO {
	public ProductDAO(Connection connection) {
		super(connection);
	}

	/**
	 * Inserts the given product in the database.
	 *
	 * @param product a product
	 * @return true if the product was successfully inserted, false otherwise.
	 * @throws SQLException if a database access error occurs
	 */
	public boolean insert(Product product) throws SQLException {
		String query = "INSERT INTO product (ean, name, brand, quantity, unit) VALUES (?, ?, ?, ?, ?) ON CONFLICT DO NOTHING;";

		PreparedStatement statement = this.connection.prepareStatement(query);
		statement.setString(1, product.ean());
		statement.setString(2, product.name());
		statement.setString(3, product.brand());
		statement.setInt(4, product.quantity());
		statement.setString(5, product.unit().toString());

		int rowsAffected = statement.executeUpdate();

		return rowsAffected == 1;
	}

	/**
	 * Fetch a product from the database connection, which is then returned wrapped in an optional.
	 *
	 * @param productEan the EAN code of the product
	 * @return an optional containing a Product object if the requested product is found, and an empty optional otherwise.
	 */
	public Optional<Product> getByEan(String productEan) {
		ResultSet resultSet;
		try {
			PreparedStatement statement = connection.prepareStatement("SELECT * FROM product WHERE ean = ?");
			statement.setString(1, productEan);
			resultSet = statement.executeQuery();
			if (!resultSet.isBeforeFirst()) {
				return Optional.empty();
			}

			resultSet.next();

			Unit unit;
			try {
				unit = Unit.valueOf(resultSet.getString("unit"));
			} catch (IllegalArgumentException e) {
				System.err.println(e.getMessage());

				return Optional.empty();
			}

			Product product = new Product(
				productEan,
				resultSet.getString("name"),
				resultSet.getString("brand"),
				resultSet.getInt("quantity"),
				unit
			);

			return Optional.of(product);
		} catch (SQLException e) {
			System.err.println(e.getMessage());

			return Optional.empty();
		}
	}

	/**
	 * Search for products in the database that match the given query.
	 * The query is matched against the product name and brand.
	 *
	 * @param query the search query
	 * @return a list of products that match the query
	 */
	public List<Product> search(String query) {
		List<Product> products = new ArrayList<>();
		try {
			PreparedStatement statement = connection.prepareStatement(
				"SELECT * FROM product WHERE name ILIKE ? OR ean ILIKE ?"
			);
			String searchQuery = "%" + query + "%";
			statement.setString(1, searchQuery);
			statement.setString(2, searchQuery);
			ResultSet resultSet = statement.executeQuery();

			while (resultSet.next()) {
				String ean = resultSet.getString("ean");
				String name = resultSet.getString("name");
				String brand = resultSet.getString("brand");
				int quantity = resultSet.getInt("quantity");
				Unit unit = Unit.valueOf(resultSet.getString("unit"));

				Product product = new Product(ean, name, brand, quantity, unit);
			 products.add(product);
			}
		} catch (SQLException e) {
			System.err.println(e.getMessage());
		}

		return products;
	}
}
