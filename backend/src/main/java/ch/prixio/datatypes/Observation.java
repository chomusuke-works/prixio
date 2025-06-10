package ch.prixio.datatypes;

import java.time.LocalDate;

public record Observation(Long ean, Supermarket supermarket, LocalDate date, double price) {
}
