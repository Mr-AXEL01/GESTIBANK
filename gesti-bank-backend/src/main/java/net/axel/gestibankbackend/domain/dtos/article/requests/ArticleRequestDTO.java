package net.axel.gestibankbackend.domain.dtos.article.requests;

public record ArticleRequestDTO (
        String name,
        String description,
        Integer quantity
) {
}
