package ch.prixio.datatypes;

public record Product(
		Long ean,
	String name,
	String brand,
	int quantity,
	Unit unit
) {}
