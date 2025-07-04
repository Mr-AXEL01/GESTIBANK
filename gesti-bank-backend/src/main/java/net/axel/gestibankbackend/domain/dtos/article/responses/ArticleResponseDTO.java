package net.axel.gestibankbackend.domain.dtos.article.responses;

public record ArticleResponseDTO(
        Long id,
        String name,
        String description,
        Double price,
        Integer quantity
) {
}
