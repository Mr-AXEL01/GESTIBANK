package net.axel.gestibankbackend.service.impl;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.comment.requests.CommentRequestDTO;
import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.entities.Comment;
import net.axel.gestibankbackend.domain.entities.Demand;
import net.axel.gestibankbackend.domain.entities.Quote;
import net.axel.gestibankbackend.domain.enums.CommentType;
import net.axel.gestibankbackend.exception.domains.ResourceNotFoundException;
import net.axel.gestibankbackend.mapper.CommentMapper;
import net.axel.gestibankbackend.repository.CommentRepository;
import net.axel.gestibankbackend.repository.DemandRepository;
import net.axel.gestibankbackend.repository.QuoteRepository;
import net.axel.gestibankbackend.service.CommentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository repository;
    private final CommentMapper mapper;
    private final DemandRepository demandRepository;
    private final QuoteRepository quoteRepository;

    @Override
    public Comment create(CommentRequestDTO dto, AppUser creator) {
        CommentType commentType = CommentType.valueOf(dto.type().toUpperCase());
        Comment comment = Comment.createComment(dto.content(), commentType, creator);

        if (dto.demandId() != null) {
            Demand demand = demandRepository.findById(dto.demandId())
                    .orElseThrow(() -> new ResourceNotFoundException("Demand", dto.demandId()));
            comment.setDemand(demand);
        }

        if (dto.quoteId() != null) {
            Quote quote = quoteRepository.findById(dto.quoteId())
                    .orElseThrow(() -> new ResourceNotFoundException("Quote", dto.quoteId()));
            comment.setQuote(quote);
        }

        return repository.save(comment);
    }
}
