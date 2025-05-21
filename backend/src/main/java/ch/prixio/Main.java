package ch.prixio;

import ch.prixio.controllers.ObservationController;
import io.javalin.Javalin;

import ch.prixio.controllers.ProductController;

public class Main {
	private static final int PORT = 8080;

	public static void main(String[] args) {
		var productController = new ProductController();
		var recordController = new ObservationController();

		var app = Javalin.create()
			.get("/product/{ean}", productController::getProduct)
			.post("/record/{ean}", recordController::registerPriceObservation)
			.start(PORT);
	}
}