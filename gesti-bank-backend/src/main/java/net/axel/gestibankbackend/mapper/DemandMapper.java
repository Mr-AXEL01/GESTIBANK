package net.axel.gestibankbackend.mapper;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.article.ArticleEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.demand.DemandEmbeddedDTO;
import net.axel.gestibankbackend.domain.dtos.demand.responses.DemandResponseDTO;
import net.axel.gestibankbackend.domain.dtos.user.UserEmbeddedDTO;
import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.entities.Article;
import net.axel.gestibankbackend.domain.entities.Demand;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class DemandMapper {

    private final CommentMapper commentMapper;

    public DemandResponseDTO toResponseDto(Demand demand) {
        if (demand == null) return null;

        return new DemandResponseDTO(
                demand.getId(),
                demand.getTitle(),
                demand.getDescription(),
                demand.getCreatedAt(),
                demand.getAttachedFile(),
                demand.getArticles().stream().map(this::mapArticleToEmbedded).toList(),
                new ArrayList<>(),
                mapUserToEmbedded(demand.getCreatedBy()),
                demand.getStatus(),
                demand.getComments().stream().map(commentMapper::mapToEmbedded).toList()
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

    public UserEmbeddedDTO mapUserToEmbedded(AppUser user) {
        if (user == null) return null;
        return new UserEmbeddedDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getRole()
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
