package net.axel.gestibankbackend.domain.dtos.comment.responses;

import net.axel.gestibankbackend.domain.dtos.demand.DemandEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.quote.QuoteEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.user.UserEmbeddedDTO;
import net.axel.gestibankbackend.domain.enums.CommentType;

import java.time.Instant;

public record CommentResponsesDTO(
        Long id,
        UserEmbeddedDTO createdBy,
        String content,
        Instant createdAt,
        CommentType type,
        DemandEmbeddedDTO demand,
        QuoteEmbeddedDTO quote
) {
}
