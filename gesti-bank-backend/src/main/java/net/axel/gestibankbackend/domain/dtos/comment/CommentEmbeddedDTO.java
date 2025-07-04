package net.axel.gestibankbackend.domain.dtos.comment;

import net.axel.gestibankbackend.domain.enums.CommentType;

import java.time.Instant;

public record CommentEmbeddedDTO(
        Long id,
        String content,
        Instant createdAt,
        CommentType type
) {
}
