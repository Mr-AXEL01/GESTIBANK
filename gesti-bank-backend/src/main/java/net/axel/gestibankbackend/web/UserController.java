package net.axel.gestibankbackend.web;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.user.responses.UserResponseDTO;
import net.axel.gestibankbackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(UserController.CONTROLLER_PATH)

@RequiredArgsConstructor
public class UserController {

    public final static String CONTROLLER_PATH = "api/v1/users";

    private final UserService service;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> findAllUsers(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size,
                                                              Principal connectedUser) {
        List<UserResponseDTO> users = service.findAllUsers(page, size, connectedUser.getName());
        return ResponseEntity.ok(users);
    }
}
