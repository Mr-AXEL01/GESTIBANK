package net.axel.gestibankbackend.mapper;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.user.UserEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.UserResponseDTO;
import net.axel.gestibankbackend.domain.entities.AppUser;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final DemandMapper demandMapper;
    private final QuoteMapper quoteMapper;

    public UserEmbeddedDTO mapToEmbedded(AppUser user) {
        if (user == null) return null;
        return new UserEmbeddedDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getRole()
        );
    }

    public UserResponseDTO toResponseDTO(AppUser user) {
        if (user == null) return null;

        return new UserResponseDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt(),
                user.getDemands().stream().map(demandMapper::toEmbeddedDto).toList(),
                user.getQuotes().stream().map(quoteMapper::mapToEmbedded).toList()
        );
    }
}
