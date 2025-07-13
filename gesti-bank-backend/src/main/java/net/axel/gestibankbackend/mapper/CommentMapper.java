package net.axel.gestibankbackend.mapper;

import net.axel.gestibankbackend.domain.dtos.comment.CommentEmbeddedDTO;
import net.axel.gestibankbackend.domain.entities.Comment;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    public CommentEmbeddedDTO mapToEmbedded(Comment comment) {
        if (comment == null) return null;

        return new CommentEmbeddedDTO(
                comment.getId(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getType()
        );
    }
}
