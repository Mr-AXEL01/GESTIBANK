package net.axel.gestibankbackend.security.service;


import net.axel.gestibankbackend.domain.dtos.user.requests.UserLoginDTO;
import net.axel.gestibankbackend.domain.dtos.user.requests.UserRegisterDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.AuthenticationResponseDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.UserResponseDTO;

public interface AuthService {

    AuthenticationResponseDTO login(UserLoginDTO loginDTO);

    UserResponseDTO register(UserRegisterDTO registerDTO);
}
