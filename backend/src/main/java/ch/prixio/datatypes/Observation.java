package ch.prixio.datatypes;

import java.time.LocalDate;

public record Observation(long ean, Supermarket supermarket, LocalDate date, double price) {
}
