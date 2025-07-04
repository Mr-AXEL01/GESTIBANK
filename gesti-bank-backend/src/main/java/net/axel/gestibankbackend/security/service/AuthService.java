package net.axel.gestibankbackend.security.service;


import net.axel.gestibankbackend.domain.dtos.user.requests.UserLoginDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.AuthenticationResponseDTO;

public interface AuthService {
    AuthenticationResponseDTO login(UserLoginDTO loginDTO);
}
