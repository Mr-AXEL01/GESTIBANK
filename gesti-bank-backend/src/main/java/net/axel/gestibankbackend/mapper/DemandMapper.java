package net.axel.gestibankbackend.mapper;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.article.ArticleEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.demand.DemandEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.demand.responses.DemandResponseDTO;
import net.axel.gestibankbackend.domain.entities.Article;
import net.axel.gestibankbackend.domain.entities.Demand;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class DemandMapper {

    private final UserMapper userMapper;

    public DemandResponseDTO toResponseDto(Demand demand) {
        if (demand == null) return null;

        return new DemandResponseDTO(
                demand.getId(),
                demand.getTitle(),
                demand.getDescription(),
                demand.getAttachedFile(),
                demand.getArticles().stream().map(this::mapArticleToEmbedded).toList(),
                new ArrayList<>(),
                userMapper.mapToEmbedded(demand.getCreatedBy()),
                demand.getStatus(),
                new ArrayList<>()
        );
    }

    public DemandEmbeddedDTO toEmbeddedDto(Demand demand) {
        if (demand == null) return null;
        return new DemandEmbeddedDTO(
                demand.getId(),
                demand.getTitle(),
                demand.getDescription(),
                demand.getStatus(),
                demand.getCreatedAt(),
                demand.getAttachedFile()
        );
    }

    public ArticleEmbeddedDTO mapArticleToEmbedded(Article article) {
        return new ArticleEmbeddedDTO(
                article.getId(),
                article.getName(),
                article.getDescription(),
                article.getPrice(),
                article.getQuantity()
        );
    }
}
