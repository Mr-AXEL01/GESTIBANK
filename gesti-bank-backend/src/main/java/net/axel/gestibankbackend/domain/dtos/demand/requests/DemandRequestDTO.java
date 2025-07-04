package net.axel.gestibankbackend.domain.dtos.demand.requests;

import net.axel.gestibankbackend.domain.dtos.article.requests.ArticleRequestDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record DemandRequestDTO (
        String title,
        String description,
        MultipartFile attachedFile,
        List<ArticleRequestDTO> articles
) {
}
