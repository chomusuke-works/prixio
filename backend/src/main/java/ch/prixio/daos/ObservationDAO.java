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

	public List<Observation> getObservations(Long productEan) {
		try {
			String query = "SELECT * FROM observation WHERE product_ean = ?;";
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, productEan);
			return getObservationsWithStatement(statement);
		} catch (SQLException e) {
			System.err.println(e.getMessage());

			return Collections.emptyList();
		}
	}

	/**
	 * Fetches all observations for all products, sorting by date beginning from the latest.
	 *
	 * @return a list of observations
	 * @throws SQLException if a database access error occurs
	 */
	public List<Observation> getAllObservations() throws SQLException {
		String query = "SELECT * FROM observation ORDER BY product_ean, date DESC;";
		PreparedStatement statement = connection.prepareStatement(query);
		return getObservationsWithStatement(statement);
	}

	private List<Observation> getObservationsWithStatement(PreparedStatement statement) throws SQLException {
		List<Observation> observations = new LinkedList<>();

		ResultSet resultSet = statement.executeQuery();

		while (resultSet.next()) {
			Observation observation = new Observation(
				resultSet.getLong("product_ean"),
				new Supermarket(resultSet.getString("supermarket_name")),
				resultSet.getDate("date").toLocalDate(),
				resultSet.getDouble("price")
			);

			observations.add(observation);
		}

		return observations;
	}

	public boolean insertObservation(Observation observation) throws SQLException {
		String query = "INSERT INTO observation(supermarket_name, product_ean, date, price) VALUES(?, ?, ?, ?);";
		PreparedStatement statement = connection.prepareStatement(query);
		statement.setString(1, observation.supermarket().name());
		statement.setLong(2, observation.ean());
		statement.setDate(3, Date.valueOf(observation.date()));
		statement.setDouble(4, observation.price());
		int affectedRows = statement.executeUpdate();

		return affectedRows == 1;
	}
}
