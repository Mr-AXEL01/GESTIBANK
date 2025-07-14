package net.axel.gestibankbackend.domain.dtos.user.responses;

import net.axel.gestibankbackend.domain.dtos.demand.DemandEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.quote.QuoteEmbeddedDTO;
import net.axel.gestibankbackend.domain.enums.AppRole;

import java.time.Instant;
import java.util.List;

public record UserResponseDTO(
        Long id,

        String firstName,

        String lastName,

        String email,

        AppRole role,

        Instant createdAt,

        List<DemandEmbeddedDTO> demands,

        List<QuoteEmbeddedDTO> quotes
) {
}
