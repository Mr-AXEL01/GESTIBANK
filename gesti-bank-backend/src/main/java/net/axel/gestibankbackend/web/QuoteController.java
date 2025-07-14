package net.axel.gestibankbackend.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteRequestDTO;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteValidateDTO;
import net.axel.gestibankbackend.domain.dtos.quote.responses.QuoteResponseDTO;
import net.axel.gestibankbackend.service.QuoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(QuoteController.CONTROLLER_PATH)

@RequiredArgsConstructor
public class QuoteController {

    public final static String CONTROLLER_PATH = "api/v1/quotes";

    private final QuoteService service;

    @PostMapping
    public ResponseEntity<QuoteResponseDTO> create(@RequestBody @Valid QuoteRequestDTO dto,
                                   Principal connectedUser) {
        QuoteResponseDTO quote = service.create(dto, connectedUser.getName());

        return new ResponseEntity<>(quote, HttpStatus.CREATED);
    }

    public ResponseEntity<QuoteResponseDTO> validate(@RequestBody @Valid QuoteValidateDTO dto,
                                                     Principal connectedUser) {
        service.validate(dto, connectedUser.getName());
    }
}
