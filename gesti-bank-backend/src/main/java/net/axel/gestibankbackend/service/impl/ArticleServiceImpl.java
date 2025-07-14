package net.axel.gestibankbackend.service.impl;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.article.requests.ArticleRequestDTO;
import net.axel.gestibankbackend.domain.dtos.article.requests.ArticleUpdateDTO;
import net.axel.gestibankbackend.domain.entities.Article;
import net.axel.gestibankbackend.exception.domains.ResourceNotFoundException;
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
    public Article create(ArticleRequestDTO dto) {

        return null;
    }

    @Override
    public Article update(ArticleUpdateDTO dto) {
       if (!repository.existsById(dto.id())) throw new ResourceNotFoundException("Article", dto);

        Article article = getArticle(dto.id());
        article.setName(dto.name())
                .setDescription(dto.description())
                .setQuantity(dto.quantity());
        return article;
    }

    private Article getArticle(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", id));
    }
}
