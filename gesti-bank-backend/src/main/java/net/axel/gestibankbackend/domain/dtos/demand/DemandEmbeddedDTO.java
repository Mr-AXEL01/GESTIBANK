package net.axel.gestibankbackend.domain.dtos.demand;

import net.axel.gestibankbackend.domain.dtos.user.UserEmbeddedDTO;
import net.axel.gestibankbackend.domain.enums.DemandStatus;

import java.time.Instant;

public record DemandEmbeddedDTO(
        Long id,
        String title,
        String description,
        DemandStatus status,
        UserEmbeddedDTO createdBy,
        Instant createdAt,
        String attachedFile
) {
}
