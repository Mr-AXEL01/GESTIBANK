package net.axel.gestibankbackend.service.impl;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.user.responses.UserResponseDTO;
import net.axel.gestibankbackend.mapper.UserMapper;
import net.axel.gestibankbackend.repository.UserRepository;
import net.axel.gestibankbackend.service.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional

@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final UserMapper mapper;

    @Override
    public List<UserResponseDTO> findAllUsers(int page, int size, String email) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        return repository.findAll(pageable)
                .stream()
                .filter(user -> !user.getEmail().equals(email))
                .map(mapper::toResponseDTO)
                .toList();
    }
}
