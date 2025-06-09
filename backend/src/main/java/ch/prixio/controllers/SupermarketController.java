package ch.prixio.controllers;

import ch.prixio.daos.SupermarketDAO;
import ch.prixio.datatypes.Supermarket;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;

import java.sql.Connection;
import java.sql.SQLException;

public class SupermarketController {
	private final SupermarketDAO supermarketDAO;

	public SupermarketController(Connection connection) {
		supermarketDAO = new SupermarketDAO(connection);
	}

	public void createSupermarket(Context ctx) {
		Supermarket newSupermarket = ctx.bodyAsClass(Supermarket.class);
		try {
			boolean insertedSuccessfully = supermarketDAO.insert(newSupermarket);
			ctx.status(insertedSuccessfully ? HttpStatus.CREATED : HttpStatus.CONFLICT);
		} catch (SQLException e) {
			ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);
			throw new RuntimeException(e);
		}
	}
}
