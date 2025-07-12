package net.axel.gestibankbackend.mapper;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.article.responses.ArticleResponseDTO;
import net.axel.gestibankbackend.domain.entities.Article;
import net.axel.gestibankbackend.domain.entities.Demand;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ArticleMapper {

    private final DemandMapper demandMapper;

    public ArticleResponseDTO toResponseDto(Article article, Demand demand) {
        if (article == null) return null;

        return new ArticleResponseDTO(
                article.getId(),
                article.getName(),
                article.getDescription(),
                article.getQuantity(),
                demandMapper.toEmbeddedDto(demand)
        );
    }
}
