package net.axel.gestibankbackend.domain.dtos.demand.responses;

import net.axel.gestibankbackend.domain.dtos.article.ArticleEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.comment.CommentEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.quote.QuoteEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.user.UserEmbeddedDTO;
import net.axel.gestibankbackend.domain.enums.DemandStatus;

import java.time.Instant;
import java.util.List;

public record DemandResponseDTO(
        Long id,
        String title,
        String description,
        Instant createdAt,
        String attachedFile,
        List<ArticleEmbeddedDTO> articles,
        List<QuoteEmbeddedDTO> quotes,
        UserEmbeddedDTO createdBy,
        DemandStatus status,
        List<CommentEmbeddedDTO> comments
) {
}
