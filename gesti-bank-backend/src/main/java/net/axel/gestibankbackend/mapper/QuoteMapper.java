package net.axel.gestibankbackend.mapper;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.quote.QuoteEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.quote.responses.QuoteResponseDTO;
import net.axel.gestibankbackend.domain.dtos.user.UserEmbeddedDTO;
import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.entities.Quote;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuoteMapper {

    private final DemandMapper demandMapper;
    private final CommentMapper commentMapper;

    public QuoteResponseDTO mapToResponse(Quote quote) {
        if (quote == null) return null;

        return new QuoteResponseDTO(
                quote.getId(),
                mapUserToEmbedded(quote.getCreatedBy()),
                quote.getTotalAmount(),
                quote.getStatus(),
                demandMapper.toEmbeddedDto(quote.getDemand()),
                quote.getComments().stream().map(commentMapper::mapToEmbedded).toList(),
                quote.getBonCommand()
        );
    }

    public QuoteEmbeddedDTO mapToEmbedded(Quote quote) {
        if (quote == null) return null;

        return new QuoteEmbeddedDTO(
                quote.getId(),
                quote.getCreatedAt(),
                quote.getTotalAmount(),
                quote.getStatus()
        );
    }

    public UserEmbeddedDTO mapUserToEmbedded(AppUser user) {
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
}
