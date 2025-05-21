package ch.prixio.controllers;

import java.time.LocalDate;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;

import ch.prixio.datatypes.Observation;
import ch.prixio.datatypes.Product;
import ch.prixio.datatypes.Supermarket;
import ch.prixio.datatypes.Unit;


public class ProductController {
	public void getProduct(Context ctx) {
		long ean;
		try {
			ean = Long.parseLong(ctx.pathParam("ean"));
		} catch (NumberFormatException e) {
			ctx.status(HttpStatus.BAD_REQUEST);

			return;
		}
		Product fetchedProduct = getProductFromDb(ean);

		ctx.json(fetchedProduct);
	}

	/**
	 * TODO: Database link, currently returns a dummy value
	 *
	 * @param ean the ean of the product
	 * @return an instance of Product
	 */
	private Product getProductFromDb(long ean) {
		var coop = new Supermarket("Coop");
		return new Product(
			80990062,
			"Pure fresh sugarfree",
			"Mentos",
			90,
			Unit.GRAMS,
			null,
			new Observation[]{
				new Observation(80990062, coop, LocalDate.of(2024, 11, 1), 5.8),
				new Observation(80990062, coop, LocalDate.of(2024, 12, 5), 5.85),
				new Observation(80990062, coop, LocalDate.of(2025, 1, 12), 5.95),
				new Observation(80990062, coop, LocalDate.of(2025, 2, 13), 5.90),
				new Observation(80990062, coop, LocalDate.of(2025, 3, 28), 5.95),
				new Observation(80990062, coop, LocalDate.of(2025, 4, 7), 6.10)
			}
		);
	}
}
