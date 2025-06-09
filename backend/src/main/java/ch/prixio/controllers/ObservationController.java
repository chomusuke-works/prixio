package ch.prixio.controllers;

import ch.prixio.daos.ObservationDAO;
import ch.prixio.datatypes.Observation;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;

import java.sql.Connection;
import java.sql.SQLException;

public class ObservationController {
	private final ObservationDAO observationDAO;

	public ObservationController(Connection connection) {
		this.observationDAO = new ObservationDAO(connection);
	}

	public void registerPriceObservation(Context ctx) {
		Observation observation = ctx.bodyAsClass(Observation.class);

		try {
			boolean success = observationDAO.insertObservation(observation);
			ctx.status(success ? HttpStatus.CREATED : HttpStatus.CONFLICT);
		} catch (SQLException e) {
			ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);

			throw new RuntimeException(e);
		}
	}
}
