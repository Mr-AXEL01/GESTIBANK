package net.axel.gestibankbackend.mapper;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.quote.responses.QuoteResponseDTO;
import net.axel.gestibankbackend.domain.entities.Quote;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuoteMapper {

    private final UserMapper userMapper;
    private final DemandMapper demandMapper;
    private final CommentMapper commentMapper;

    public QuoteResponseDTO mapToResponse(Quote quote) {
        if (quote == null) return null;

        return new QuoteResponseDTO(
                quote.getId(),
                userMapper.mapToEmbedded(quote.getCreatedBy()),
                quote.getTotalAmount(),
                quote.getStatus(),
                demandMapper.toEmbeddedDto(quote.getDemand()),
                quote.getComments().stream().map(commentMapper::mapToEmbedded).toList(),
                quote.getBonCommand()
        );
    }
}
