package net.axel.gestibankbackend.repository;

import net.axel.gestibankbackend.domain.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
