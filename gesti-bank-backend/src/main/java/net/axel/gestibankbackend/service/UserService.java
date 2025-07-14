package net.axel.gestibankbackend.service;

import net.axel.gestibankbackend.domain.dtos.user.responses.UserResponseDTO;

import java.util.List;

public interface UserService {

    List<UserResponseDTO> findAllUsers(int page, int size, String email);

    void remove(Long id);
}
