package net.axel.gestibankbackend.service;

import net.axel.gestibankbackend.domain.dtos.comment.requests.CommentRequestDTO;
import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.entities.Comment;

public interface CommentService {
    Comment create(CommentRequestDTO dto, AppUser creator);
}
