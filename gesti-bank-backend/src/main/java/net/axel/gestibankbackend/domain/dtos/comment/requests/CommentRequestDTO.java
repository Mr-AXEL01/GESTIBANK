package net.axel.gestibankbackend.domain.dtos.comment.requests;

public record CommentRequestDTO(
        String content,
        String type,
        Long demandId,
        Long quoteId
) {
}
