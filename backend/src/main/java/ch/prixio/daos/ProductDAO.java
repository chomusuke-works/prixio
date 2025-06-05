package ch.prixio.daos;

import ch.prixio.datatypes.Observation;
import ch.prixio.datatypes.Product;
import ch.prixio.datatypes.Unit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

public class ProductDAO extends DAO {
	public ProductDAO(Connection connection) {
		super(connection);
	}

	/**
	 * Fetch a product from the database connection, which is then returned wrapped in an optional.
	 * The resulting Product object will have an empty observations array.
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
				unit,
				new Observation[0]
			);

			return Optional.of(product);
		} catch (SQLException e) {
			System.err.println(e.getMessage());

			return Optional.empty();
		}
	}
}
