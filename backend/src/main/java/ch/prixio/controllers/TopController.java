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
import org.jetbrains.annotations.NotNull;

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
		BoundedPriorityQueue<Pair<String, PriceChange>> top = getTopObservations(
			observationDAO,
			(a, b) -> (int) Math.signum(a.getSecond().getPriceChange() - b.getSecond().getPriceChange())
		);
		List<ProductWithPriceChange> finalList = joinProductToPriceChanges(top, productDAO);

		ctx.json(finalList);
	}

	public void getTopDown(Context ctx) {
		BoundedPriorityQueue<Pair<String, PriceChange>> top = getTopObservations(
			observationDAO,
			(a, b) -> (int) -Math.signum(a.getSecond().getPriceChange() - b.getSecond().getPriceChange())
		);
		List<ProductWithPriceChange> finalList = joinProductToPriceChanges(top, productDAO);

		ctx.json(finalList);
	}

	@NotNull
	private static BoundedPriorityQueue<Pair<String, PriceChange>> getTopObservations(
		ObservationDAO dataSource,
		Comparator<Pair<String, PriceChange>> comparator
	) {
		BoundedPriorityQueue<Pair<String, PriceChange>> top = new BoundedPriorityQueue<>(
			MAX_TOP_COUNT,
			comparator
		);
		List<Observation> observations;
		try {
			observations = dataSource.getAllObservations();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		int i = 0;
		String lastEan;
		while (i < observations.size()) {
			Observation a = observations.get(i);
			Observation b = observations.get(i+1);
			lastEan = a.ean();

			if (a.ean().equals(b.ean())) {
				PriceChange c = new PriceChange(b.price(), a.price());
				Pair<String, PriceChange> pair = new Pair<>(b.ean(), c);
				top.offer(pair);
			}
			while (i < observations.size() && observations.get(i).ean().equals(lastEan)) ++i;  // Advance to the next product
		}

		return top;
	}

	private static List<ProductWithPriceChange> joinProductToPriceChanges(BoundedPriorityQueue<Pair<String, PriceChange>> pairs, ProductDAO dataSource) throws NoSuchElementException{
		return pairs.stream()
			.map((pair) -> {
				Optional<Product> product = dataSource.getByEan(pair.getFirst());
				if (product.isPresent()) {
					return new ProductWithPriceChange(product.get(), pair.getSecond());
				}

				throw new NoSuchElementException("No product found with ean " + pair.getFirst());
			})
			.toList();
	}
}
