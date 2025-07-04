package net.axel.gestibankbackend.service;

import net.axel.gestibankbackend.domain.dtos.article.requests.ArticleRequestDTO;
import net.axel.gestibankbackend.domain.dtos.article.responses.ArticleResponseDTO;

public interface ArticleService {

    ArticleResponseDTO create(ArticleRequestDTO dto);
}
