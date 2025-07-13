package net.axel.gestibankbackend.service;

import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteRequestDTO;
import net.axel.gestibankbackend.domain.dtos.quote.responses.QuoteResponseDTO;

public interface QuoteService {

    QuoteResponseDTO create(QuoteRequestDTO dto, String email);
}
