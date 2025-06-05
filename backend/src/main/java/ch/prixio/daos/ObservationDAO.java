package ch.prixio.daos;

import ch.prixio.datatypes.Observation;
import ch.prixio.datatypes.Supermarket;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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
			PreparedStatement statement = connection.prepareStatement("SELECT * FROM observation WHERE product_ean = ?;");
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
}
