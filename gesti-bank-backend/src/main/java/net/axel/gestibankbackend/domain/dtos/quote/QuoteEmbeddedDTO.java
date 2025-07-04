package net.axel.gestibankbackend.domain.dtos.quote;

import net.axel.gestibankbackend.domain.enums.QuoteStatus;

import java.time.Instant;

public record QuoteEmbeddedDTO(
        Long id,
        Instant createdAt,
        Double totalAmount,
        QuoteStatus status
) {
}
