package net.axel.gestibankbackend.domain.dtos.quote.requests;

public record QuoteUpdateDTO(
        Long id,
        Double totalAmount
) {
}
