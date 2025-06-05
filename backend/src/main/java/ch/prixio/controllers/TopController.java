package ch.prixio.controllers;

import ch.prixio.datatypes.Observation;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;

import java.util.*;
import java.util.stream.Collectors;

public class TopController {
	public void getTopUp(Context ctx) {
		List<Observation> observations = nObservations(new ArrayList<>(), 3);
		ctx.json(observations);
		ctx.status(HttpStatus.OK);
	}

	public void getTopDown(Context ctx) {

	}

	private static List<Observation> nObservations(List<Observation> observations, int n) {
		Map<String, List<Observation>> map = new HashMap<>();

		for (Observation observation : observations) {
			if (!map.containsKey(observation.ean())) {
				map.put(observation.ean(), new ArrayList<>());
			}
			List<Observation> observationList = map.get(observation.ean());
			if (observationList.size() < n) {
				observationList.add(observation);
			}
		}

		return map.values().stream()
			.flatMap(Collection::stream)
			.collect(Collectors.toList());
	}
}
