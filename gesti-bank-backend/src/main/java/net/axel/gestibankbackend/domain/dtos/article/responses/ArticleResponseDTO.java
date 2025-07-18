package net.axel.gestibankbackend.domain.dtos.article.responses;

import net.axel.gestibankbackend.domain.dtos.demand.DemandEmbeddedDTO;

public record ArticleResponseDTO(
        Long id,
        String name,
        String description,
        Integer quantity,
        DemandEmbeddedDTO demand
) {
}
