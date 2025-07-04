package net.axel.gestibankbackend.service.impl;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.article.requests.ArticleRequestDTO;
import net.axel.gestibankbackend.domain.dtos.article.responses.ArticleResponseDTO;
import net.axel.gestibankbackend.domain.entities.Article;
import net.axel.gestibankbackend.mapper.ArticleMapper;
import net.axel.gestibankbackend.repository.ArticleRepository;
import net.axel.gestibankbackend.service.ArticleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository repository;
    private ArticleMapper mapper;

    @Override
    public ArticleResponseDTO create(ArticleRequestDTO dto) {

        return null;
    }
}
