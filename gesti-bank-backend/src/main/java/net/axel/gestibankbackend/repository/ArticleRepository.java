package net.axel.gestibankbackend.repository;

import net.axel.gestibankbackend.domain.entities.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
