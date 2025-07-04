package net.axel.gestibankbackend.domain.dtos.quote.requests;

public record QuoteRequestDTO(
        Double totalAmount,
        Long demandId
) {
}
