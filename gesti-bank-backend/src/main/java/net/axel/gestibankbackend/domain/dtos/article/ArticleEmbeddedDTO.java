package net.axel.gestibankbackend.domain.dtos.article;

public record ArticleEmbeddedDTO(
        Long id,
        String name,
        String description,
        Double price,
        Integer quantity
) {
}
