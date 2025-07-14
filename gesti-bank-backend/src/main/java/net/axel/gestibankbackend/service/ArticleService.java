package net.axel.gestibankbackend.service;

import net.axel.gestibankbackend.domain.dtos.article.requests.ArticleRequestDTO;
import net.axel.gestibankbackend.domain.dtos.article.requests.ArticleUpdateDTO;
import net.axel.gestibankbackend.domain.entities.Article;

public interface ArticleService {

    Article create(ArticleRequestDTO dto);

    Article update(ArticleUpdateDTO dto);
}
