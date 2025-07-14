package net.axel.gestibankbackend.service;

import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteManageDTO;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteRequestDTO;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteValidateDTO;
import net.axel.gestibankbackend.domain.dtos.quote.responses.QuoteResponseDTO;

import java.util.List;

public interface QuoteService {

    QuoteResponseDTO create(QuoteRequestDTO dto, String email);

    List<QuoteResponseDTO> findAllQuotes(int page, int size);

    QuoteResponseDTO validate(QuoteValidateDTO dto, String email);

    QuoteResponseDTO manage(QuoteManageDTO dto);
}
