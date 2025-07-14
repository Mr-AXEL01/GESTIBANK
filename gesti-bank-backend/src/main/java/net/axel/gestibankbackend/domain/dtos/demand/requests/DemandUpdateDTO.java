package net.axel.gestibankbackend.domain.dtos.demand.requests;

import net.axel.gestibankbackend.domain.dtos.article.requests.ArticleUpdateDTO;

import java.util.List;

public record DemandUpdateDTO(
        Long id,
        String title,
        String description,
        List<ArticleUpdateDTO> articles
) {
}
