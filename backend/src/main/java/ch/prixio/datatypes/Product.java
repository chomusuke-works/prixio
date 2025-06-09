package ch.prixio.datatypes;

public record Product(
	String ean,
	String name,
	String brand,
	int quantity,
	Unit unit
) {}
