package ch.prixio.controllers;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;

import ch.prixio.daos.ObservationDAO;
import ch.prixio.daos.ProductDAO;
import ch.prixio.datatypes.Observation;
import ch.prixio.datatypes.Product;
import ch.prixio.datatypes.ProductWithPriceHistory;
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
		Optional<Product> product = productDAO.getByEan(productEan);
		if (product.isPresent()) {
			ctx.json(product.get());
		} else {
			ctx.status(HttpStatus.NOT_FOUND);
		}
	}

	public void getProductWithPriceHistory(Context ctx) {
		String productEan = ctx.pathParam("ean");
		Optional<Product> product = this.productDAO.getByEan(productEan);
		if (product.isPresent()) {
			List<Observation> observations = this.observationDAO.getObservations(productEan);

			ctx.json(new ProductWithPriceHistory(product.get(), observations));
		} else {
			ctx.status(HttpStatus.NOT_FOUND);
		}
	}

	public void searchProducts(Context ctx) {
		String query = ctx.pathParam("query");
		List<Product> products = productDAO.search(query);
		ctx.json(products);
	}
}
