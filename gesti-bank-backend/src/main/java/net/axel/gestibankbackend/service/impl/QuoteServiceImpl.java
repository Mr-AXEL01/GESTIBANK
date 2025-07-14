package net.axel.gestibankbackend.service.impl;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteManageDTO;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteRequestDTO;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteUpdateDTO;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteValidateDTO;
import net.axel.gestibankbackend.domain.dtos.quote.responses.QuoteResponseDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.ProviderStatisticsDTO;
import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.entities.Comment;
import net.axel.gestibankbackend.domain.entities.Demand;
import net.axel.gestibankbackend.domain.entities.Quote;
import net.axel.gestibankbackend.domain.enums.QuoteStatus;
import net.axel.gestibankbackend.exception.domains.ResourceNotFoundException;
import net.axel.gestibankbackend.mapper.QuoteMapper;
import net.axel.gestibankbackend.repository.QuoteRepository;
import net.axel.gestibankbackend.repository.UserRepository;
import net.axel.gestibankbackend.service.CommentService;
import net.axel.gestibankbackend.service.DemandService;
import net.axel.gestibankbackend.service.FileUploader;
import net.axel.gestibankbackend.service.QuoteService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional

@RequiredArgsConstructor
public class QuoteServiceImpl implements QuoteService {

    private final QuoteRepository repository;
    private final QuoteMapper mapper;
    private final UserRepository userRepository;
    private final DemandService demandService;
    private final CommentService commentService;
    private final FileUploader fileUploader;


    @Override
    public QuoteResponseDTO create(QuoteRequestDTO dto, String email) {
        AppUser creator = getUser(email);
        Demand demand = demandService.findDemandEntity(dto.demandId());
        Quote quote = Quote.createQuote(creator, demand, dto.totalAmount());
        return mapper.mapToResponse(repository.save(quote));
    }

    @Override
    public QuoteResponseDTO update(QuoteUpdateDTO dto) {
        Quote quote = findQuoteEntity(dto.id());
        quote.setTotalAmount(dto.totalAmount())
                .setStatus(QuoteStatus.CREATED);
        return  mapper.mapToResponse(quote);
    }

    @Override
    public List<QuoteResponseDTO> findAllQuotes(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        return repository.findAll(pageable)
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }

    @Override
    public QuoteResponseDTO findById(Long id) {
        return mapper.mapToResponse(findQuoteEntity(id));
    }

    @Override
    public QuoteResponseDTO validate(QuoteValidateDTO dto, String email) {
        AppUser user = getUser(email);
        Quote quote = findQuoteEntity(dto.comment().quoteId());
        quote.setStatus(QuoteStatus.valueOf(dto.quoteStatus().toUpperCase()));

        Comment comment = commentService.create(dto.comment(), user);
        quote.getComments().add(comment);
        return mapper.mapToResponse(quote);
    }

    @Override
    public QuoteResponseDTO manage(QuoteManageDTO dto) {
        Quote quote = findQuoteEntity(dto.quoteId());
        quote.setStatus(QuoteStatus.DONE);
        Demand demand = quote.getDemand();
        demandService.updateStatus(demand.getId(), "DONE");

        String fileUrl = dto.attachedFile() != null && !dto.attachedFile().isEmpty()
                ? uploadFile(dto.attachedFile())
                : null;

        quote.setBonCommand(fileUrl);
        return mapper.mapToResponse(quote);
    }
    
    @Override
    public ProviderStatisticsDTO getProviderStats(String email) {
        AppUser provider = getUser(email);
        int created = repository.countByCreatedBy(provider);
        int approved = repository.countByCreatedByAndStatus(provider, QuoteStatus.APPROVED);
        int pending = repository.countByCreatedByAndStatus(provider, QuoteStatus.CREATED);
        int rejected = repository.countByCreatedByAndStatus(provider, QuoteStatus.REJECTED);

        return new ProviderStatisticsDTO(created, approved, pending, rejected);
    }

    private Quote findQuoteEntity(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quote", id));
    }

    private AppUser getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Creator not exists in system"));
    }

    private String uploadFile(MultipartFile file) {
        return fileUploader.upload(file);
    }
}
