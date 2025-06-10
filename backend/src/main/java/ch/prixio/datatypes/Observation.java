package ch.prixio.datatypes;

import java.time.LocalDate;

public record Observation(String ean, Supermarket supermarket, LocalDate date, double price) {
}
