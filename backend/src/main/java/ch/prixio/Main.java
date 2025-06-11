package ch.prixio;

import ch.prixio.controllers.ProductController;
import ch.prixio.controllers.ObservationController;

import ch.prixio.controllers.SupermarketController;
import ch.prixio.controllers.TopController;
import io.javalin.Javalin;
import io.javalin.plugin.bundled.CorsPluginConfig;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Main {
	private static final int PORT = 8080;
	private static final String POSTGRES_DOMAIN = System.getenv("POSTGRES_DOMAIN");
	private static final String POSTGRES_USER = System.getenv("POSTGRES_USER");
	private static final String POSTGRES_PASSWORD = System.getenv("POSTGRES_PASSWORD");
	private static final String POSTGRES_DB = System.getenv("POSTGRES_DB");
	private static final String POSTGRES_URL = "jdbc:postgresql://%s:5432/%s".formatted(POSTGRES_DOMAIN, POSTGRES_DB);

	public static void main(String[] args) throws SQLException {
		DriverManager.registerDriver(new org.postgresql.Driver());

		Connection connection = DriverManager.getConnection(POSTGRES_URL, POSTGRES_USER, POSTGRES_PASSWORD);
		System.out.printf("Connected to database at: %s\n", POSTGRES_URL);

		var productController = new ProductController(connection);
		var supermarketController = new SupermarketController(connection);
		var observationController = new ObservationController(connection);
		var topController = new TopController(connection);

		Javalin app = Javalin.create(config ->
			config.bundledPlugins.enableCors(cors ->
				cors.addRule(CorsPluginConfig.CorsRule::anyHost)
			)
		);

		app.get("/product/{ean}", productController::getProduct)
			.get("/product/{ean}/with_price_history", productController::getProductWithPriceHistory)
			.post("/product", productController::createProduct)
			.post("/record/{ean}", observationController::registerPriceObservation)
			.get("/top/down", topController::getTopDown)
			.get("/top/up", topController::getTopUp)
			.get("/search/{query}", productController::searchProducts)
			.get("/supermarket/all", supermarketController::getAll)
			.post("/supermarket", supermarketController::createSupermarket)
			.start(PORT);
	}
}
