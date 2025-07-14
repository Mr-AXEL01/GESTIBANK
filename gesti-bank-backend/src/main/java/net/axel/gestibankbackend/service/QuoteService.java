package net.axel.gestibankbackend.service;

import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteManageDTO;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteRequestDTO;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteValidateDTO;
import net.axel.gestibankbackend.domain.dtos.quote.responses.QuoteResponseDTO;

public interface QuoteService {

    QuoteResponseDTO create(QuoteRequestDTO dto, String email);

    QuoteResponseDTO validate(QuoteValidateDTO dto, String email);

    QuoteResponseDTO manage(QuoteManageDTO dto);
}
