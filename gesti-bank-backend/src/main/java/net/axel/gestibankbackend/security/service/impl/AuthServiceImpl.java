package net.axel.gestibankbackend.security.service.impl;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.user.requests.UserLoginDTO;
import net.axel.gestibankbackend.domain.dtos.user.requests.UserRegisterDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.AuthenticationResponseDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.UserResponseDTO;
import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.enums.AppRole;
import net.axel.gestibankbackend.mapper.UserMapper;
import net.axel.gestibankbackend.repository.UserRepository;
import net.axel.gestibankbackend.security.service.AuthService;
import net.axel.gestibankbackend.security.service.JWTService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository repository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JWTService jwtService;


    @Override
    public UserResponseDTO register(UserRegisterDTO registerDTO) {
        String password = passwordEncoder.encode(registerDTO.password());

        AppRole role = AppRole.valueOf(registerDTO.role().toUpperCase());
        AppUser newUser = AppUser.register(registerDTO.firstName(), registerDTO.lastName(), registerDTO.email(), password, role);
        AppUser user = repository.save(newUser);

        return mapper.toResponseDTO(user);
    }

    @Override
    public AuthenticationResponseDTO login(UserLoginDTO loginDTO) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.email(),
                        loginDTO.password()
                )
        );

        AppUser user = (AppUser) authentication.getPrincipal();
        String token = jwtService.generateToken(user);

        return new AuthenticationResponseDTO(token);
    }
}
