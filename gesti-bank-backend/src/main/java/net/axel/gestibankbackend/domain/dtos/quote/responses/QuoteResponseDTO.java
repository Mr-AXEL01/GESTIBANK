package net.axel.gestibankbackend.domain.dtos.quote.responses;

import net.axel.gestibankbackend.domain.dtos.comment.CommentEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.demand.DemandEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.user.UserEmbeddedDTO;
import net.axel.gestibankbackend.domain.enums.QuoteStatus;

import java.util.List;

public record QuoteResponseDTO(
        Long id,
        UserEmbeddedDTO createdBy,
        Double totalAmount,
        QuoteStatus status,
        DemandEmbeddedDTO demand,
        List<CommentEmbeddedDTO> comments
) {
}
