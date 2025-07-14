package net.axel.gestibankbackend.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteManageDTO;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteRequestDTO;
import net.axel.gestibankbackend.domain.dtos.quote.requests.QuoteValidateDTO;
import net.axel.gestibankbackend.domain.dtos.quote.responses.QuoteResponseDTO;
import net.axel.gestibankbackend.service.QuoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(QuoteController.CONTROLLER_PATH)

@RequiredArgsConstructor
public class QuoteController {

    public final static String CONTROLLER_PATH = "api/v1/quotes";

    private final QuoteService service;

    @PreAuthorize("hasRole('PROVIDER')")
    @PostMapping
    public ResponseEntity<QuoteResponseDTO> create(@RequestBody @Valid QuoteRequestDTO dto,
                                   Principal connectedUser) {
        QuoteResponseDTO quote = service.create(dto, connectedUser.getName());

        return new ResponseEntity<>(quote, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('PROVIDER', 'TECHNICIAN')")
    @GetMapping
    public ResponseEntity<List<QuoteResponseDTO>> findAll(@RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "10") int size) {
        List<QuoteResponseDTO> quotes = service.findAllQuotes(page, size);

        return ResponseEntity.ok(quotes);
    }

    @PreAuthorize("hasRole('TECHNICIAN')")
    @PutMapping
    public ResponseEntity<QuoteResponseDTO> validate(@RequestBody @Valid QuoteValidateDTO dto,
                                                     Principal connectedUser) {
        QuoteResponseDTO quote = service.validate(dto, connectedUser.getName());
        return ResponseEntity.ok(quote);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/manage")
    public ResponseEntity<QuoteResponseDTO> manage(@ModelAttribute QuoteManageDTO dto) {
        QuoteResponseDTO quote = service.manage(dto);
        return ResponseEntity.ok(quote);
    }
}
