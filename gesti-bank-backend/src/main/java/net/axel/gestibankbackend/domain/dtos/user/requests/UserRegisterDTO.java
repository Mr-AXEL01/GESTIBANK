package net.axel.gestibankbackend.domain.dtos.user.requests;

public record UserRegisterDTO(
        String firstName,

        String lastName,

        String password,

        String email,

        String role
) {
}
