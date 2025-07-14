package net.axel.gestibankbackend.domain.dtos.user.requests;

import net.axel.gestibankbackend.domain.enums.AppRole;

public record UserRegisterDTO(
        String firstName,

        String lastName,

        String password,

        String email,

        String role
) {
}
