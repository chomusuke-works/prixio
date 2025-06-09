package ch.prixio.daos;

import ch.prixio.datatypes.Observation;
import ch.prixio.datatypes.Supermarket;

import java.sql.*;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class ObservationDAO extends DAO {
	public ObservationDAO(Connection connection) {
		super(connection);
	}

	public List<Observation> getObservations(String productEan) {
		List<Observation> observations = new LinkedList<>();

		try {
			String query = "SELECT * FROM observation WHERE product_ean = ?;";
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setString(1, productEan);
			ResultSet resultSet = statement.executeQuery();

			while (resultSet.next()) {
				Observation observation = new Observation(
					productEan,
					new Supermarket(resultSet.getString("supermarket_name")),
					resultSet.getDate("date").toLocalDate(),
					resultSet.getDouble("price")
				);

				observations.add(observation);
			}
		} catch (SQLException e) {
			System.err.println(e.getMessage());

			return Collections.emptyList();
		}

		return observations;
	}

	public boolean insertObservation(Observation observation) throws SQLException {
		String query = "INSERT INTO observation(supermarket_name, product_ean, date, price) VALUES(?, ?, ?, ?);";
		PreparedStatement statement = connection.prepareStatement(query);
		statement.setString(1, observation.supermarket().name());
		statement.setString(2, observation.ean());
		statement.setDate(3, Date.valueOf(observation.date()));
		statement.setDouble(4, observation.price());
		int affectedRows = statement.executeUpdate();

		return affectedRows == 1;
	}
}
