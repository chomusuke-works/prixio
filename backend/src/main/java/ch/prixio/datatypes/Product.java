package ch.prixio.datatypes;

import java.util.List;

public record Product(
	String ean,
	String name,
	String brand,
	int quantity,
	Unit unit,
	Observation[] priceHistory
) {
	public Product withPriceHistory(List<Observation> observations) {
		return this.withPriceHistory(observations.toArray(new Observation[0]));
	}

	public Product withPriceHistory(Observation... observations) {
		return new Product(ean, name, brand, quantity, unit, observations);
	}
}
