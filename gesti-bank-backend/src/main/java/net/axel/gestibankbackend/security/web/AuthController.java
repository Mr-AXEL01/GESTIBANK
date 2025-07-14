package net.axel.gestibankbackend.security.web;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.user.requests.UserLoginDTO;
import net.axel.gestibankbackend.domain.dtos.user.requests.UserRegisterDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.AuthenticationResponseDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.UserResponseDTO;
import net.axel.gestibankbackend.security.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AuthController.CONTROLLER_PATH)

@RequiredArgsConstructor
public class AuthController {

    public final static String CONTROLLER_PATH = "api/v1/auth";

    private final AuthService service;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody @Valid UserLoginDTO loginDTO) {
        var user = service.login(loginDTO);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody @Valid UserRegisterDTO requestDTO) {
        UserResponseDTO newUser = service.register(requestDTO);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
}