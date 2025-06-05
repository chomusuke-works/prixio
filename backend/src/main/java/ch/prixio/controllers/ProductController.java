package ch.prixio.controllers;

import java.sql.Connection;
import java.util.List;

import ch.prixio.daos.ObservationDAO;
import ch.prixio.daos.ProductDAO;
import ch.prixio.datatypes.Observation;
import io.javalin.http.Context;

import io.javalin.http.HttpStatus;


public class ProductController {
	private final ProductDAO productDAO;
	private final ObservationDAO observationDAO;

	public ProductController(Connection connection) {
		this.productDAO = new ProductDAO(connection);
		this.observationDAO = new ObservationDAO(connection);
	}

	public void getProduct(Context ctx) {
		String productEan = ctx.pathParam("ean");
		this.productDAO.getByEan(productEan).ifPresentOrElse(
			product -> {
				List<Observation> observations = this.observationDAO.getObservations(productEan);

				ctx.json(product.withPriceHistory(observations));
			},
			() -> ctx.status(HttpStatus.NOT_FOUND)
		);
	}
}
