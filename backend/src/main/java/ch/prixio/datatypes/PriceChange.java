package ch.prixio.datatypes;

public record PriceChange(double oldPrice, double newPrice) {
	public double getPriceChange() {
		return newPrice - oldPrice;
	}
}
