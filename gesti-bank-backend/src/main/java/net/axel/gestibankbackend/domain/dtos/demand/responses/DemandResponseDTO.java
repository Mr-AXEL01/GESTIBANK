package net.axel.gestibankbackend.domain.dtos.demand.responses;

import net.axel.gestibankbackend.domain.dtos.article.ArticleEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.comment.CommentEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.quote.QuoteEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.user.UserEmbeddedDTO;
import net.axel.gestibankbackend.domain.enums.DemandStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record DemandResponseDTO(
        String title,
        String description,
        MultipartFile attachedFile,
        List<ArticleEmbeddedDTO> articles,
        List<QuoteEmbeddedDTO> quotes,
        List<UserEmbeddedDTO> createdBy,
        DemandStatus status,
        List<CommentEmbeddedDTO> comments
) {
}
