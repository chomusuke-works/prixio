package ch.prixio.datatypes;

import java.time.LocalDate;

public record Observation(long Ean, Supermarket supermarket, LocalDate date, double price) {
}
