package ch.prixio.datatypes;

public record Product(
	long ean,
	String name,
	String brand,
	int quantity,
	Unit unit,
	Supermarket supermarket,
	Observation[] priceHistory
) { }
