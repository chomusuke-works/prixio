package ch.prixio.daos;

import ch.prixio.datatypes.Supermarket;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

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
}
