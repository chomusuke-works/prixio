package ch.prixio.daos;

import ch.prixio.datatypes.Supermarket;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

public class SupermarketDAO extends DAO {
	public SupermarketDAO(Connection connection) {
		super(connection);
	}

	public boolean insert(Supermarket supermarket) throws SQLException {
		String query = "INSERT INTO supermarket (name) VALUES (?) ON CONFLICT DO NOTHING;";

		PreparedStatement statement = this.connection.prepareStatement(query);
		statement.setString(1, supermarket.name());

		int rowsAffected = statement.executeUpdate();

		return rowsAffected == 1;
	}

	public List<Supermarket> getAll() throws SQLException {
		String query = "SELECT * FROM supermarket;";
		PreparedStatement statement = connection.prepareStatement(query);

		List<Supermarket> supermarkets = new LinkedList<>();

		ResultSet resultSet = statement.executeQuery();

		while (resultSet.next()) {
			String supermarketName = resultSet.getString("name");
			Supermarket supermarket = new Supermarket(supermarketName);

			supermarkets.add(supermarket);
		}

		return supermarkets;
	}
}
