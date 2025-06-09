package ch.prixio.datatypes;

import java.util.List;

public record ProductWithPriceHistory(Product product, List<Observation> priceHistory) {
}
