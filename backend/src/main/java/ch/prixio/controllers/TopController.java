package ch.prixio.controllers;

import ch.prixio.daos.ObservationDAO;
import ch.prixio.daos.ProductDAO;
import ch.prixio.datastructures.*;
import ch.prixio.datatypes.Observation;
import ch.prixio.datatypes.PriceChange;
import ch.prixio.datatypes.Product;
import ch.prixio.datatypes.ProductWithPriceChange;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.*;

public class TopController {
	private static final int MAX_TOP_COUNT = 3;
	private final ObservationDAO observationDAO;
	private final ProductDAO productDAO;

	public TopController(Connection connection) {
		this.observationDAO = new ObservationDAO(connection);
		this.productDAO = new ProductDAO(connection);
	}

	public void getTopUp(Context ctx) {
		ctx.status(HttpStatus.NOT_IMPLEMENTED);

		List<Observation> observations;
		try {
			observations = this.observationDAO.getAllObservations();
		} catch (SQLException e) {
			ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);

			throw new RuntimeException(e);
		}

		BoundedPriorityQueue<Pair<String, PriceChange>> topUp = new BoundedPriorityQueue<>(
			MAX_TOP_COUNT,
			(a, b) -> (int) Math.signum(a.getSecond().getPriceChange() - b.getSecond().getPriceChange())
		);

		int i = 0;
		String lastEan;
		while (i < observations.size()) {
			Observation a = observations.get(i);
			Observation b = observations.get(i+1);
			lastEan = a.ean();

			if (a.ean().equals(b.ean())) {
				PriceChange c = new PriceChange(b.price(), a.price());
				Pair<String, PriceChange> pair = new Pair<>(b.ean(), c);
				topUp.offer(pair);
			}
			while (i < observations.size() && observations.get(i).ean().equals(lastEan)) ++i;  // Advance to the next product
		}

		List<ProductWithPriceChange> finalList = topUp.stream()
			.map((pair) -> {
				Optional<Product> product = this.productDAO.getByEan(pair.getFirst());
				if (product.isPresent()) {
					return new ProductWithPriceChange(product.get(), pair.getSecond());
				}

				throw new RuntimeException("No product found with ean " + pair.getFirst());
			})
			.toList();
		ctx.json(finalList);
	}

	public void getTopDown(Context ctx) {
		ctx.status(HttpStatus.NOT_IMPLEMENTED);
	}
}
