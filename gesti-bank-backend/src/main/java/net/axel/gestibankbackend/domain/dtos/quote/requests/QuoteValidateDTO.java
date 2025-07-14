package net.axel.gestibankbackend.domain.dtos.quote.requests;

import net.axel.gestibankbackend.domain.dtos.comment.requests.CommentRequestDTO;

public record QuoteValidateDTO(
        String quoteStatus,
        CommentRequestDTO comment
) {
}
