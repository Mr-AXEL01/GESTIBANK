package net.axel.gestibankbackend.domain.dtos.user;

import net.axel.gestibankbackend.domain.enums.AppRole;

import java.time.Instant;

public record UserEmbeddedDTO(
        Long id,
        String firstName,
        String lastName,
        String email,
        Instant createdAt,
        AppRole role
) {
}
