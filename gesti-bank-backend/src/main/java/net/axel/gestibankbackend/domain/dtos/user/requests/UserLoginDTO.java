package net.axel.gestibankbackend.domain.dtos.user.requests;

import jakarta.validation.constraints.NotBlank;

public record UserLoginDTO(
        @NotBlank String email,
        @NotBlank String password
) {
}
