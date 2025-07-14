package net.axel.gestibankbackend.domain.dtos.article.requests;

public record ArticleUpdateDTO(
        Long id,
        String name,
        String description,
        Integer quantity
) {
}
