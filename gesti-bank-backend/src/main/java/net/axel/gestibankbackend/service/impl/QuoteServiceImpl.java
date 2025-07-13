package net.axel.gestibankbackend.service.impl;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteRequestDTO;
import net.axel.gestibankbackend.domain.dtos.quote.responses.QuoteResponseDTO;
import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.entities.Demand;
import net.axel.gestibankbackend.domain.entities.Quote;
import net.axel.gestibankbackend.exception.domains.ResourceNotFoundException;
import net.axel.gestibankbackend.mapper.QuoteMapper;
import net.axel.gestibankbackend.repository.QuoteRepository;
import net.axel.gestibankbackend.repository.UserRepository;
import net.axel.gestibankbackend.service.DemandService;
import net.axel.gestibankbackend.service.QuoteService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

@RequiredArgsConstructor
public class QuoteServiceImpl implements QuoteService {

    private final QuoteRepository repository;
    private final QuoteMapper mapper;
    private final UserRepository userRepository;
    private final DemandService demandService;


    @Override
    public QuoteResponseDTO create(QuoteRequestDTO dto, String email) {
        AppUser creator = getUser(email);
        Demand demand = demandService.findDemandEntity(dto.demandId());
        Quote quote = Quote.createQuote(creator, demand, dto.totalAmount());
        return mapper.mapToResponse(repository.save(quote));
    }

    private AppUser getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Creator not exists in system"));
    }
}
