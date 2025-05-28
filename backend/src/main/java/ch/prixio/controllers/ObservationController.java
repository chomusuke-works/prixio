package ch.prixio.controllers;

import ch.prixio.datatypes.Observation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.javalin.http.Context;

public class ObservationController {
	public void registerPriceObservation(Context ctx) {
		Observation observation = ctx.bodyAsClass(Observation.class);

		saveObservationToDB(observation);
	}

	/**
	 * TODO: this is a dummy operation that does not save data to a real database yet.
	 *
	 * @param observation an observation to be pushed to the database
	 */
	private void saveObservationToDB(Observation observation) {
		var objectMapper = new ObjectMapper()
			.registerModule(new JavaTimeModule());
		try {
			System.out.println(objectMapper.writeValueAsString(observation));
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}
}
