package net.axel.gestibankbackend.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandRequestDTO;
import net.axel.gestibankbackend.domain.dtos.demand.responses.DemandResponseDTO;
import net.axel.gestibankbackend.domain.entities.Demand;
import net.axel.gestibankbackend.service.DemandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(DemandController.CONTROLLER_PATH)

@RequiredArgsConstructor
public class DemandController {

    public final static String CONTROLLER_PATH = "api/v1/demands";

    private final DemandService service;

    @PostMapping
    public ResponseEntity<DemandResponseDTO> create(@ModelAttribute @Valid DemandRequestDTO dto,
                                                    Principal connectedUser) {
        DemandResponseDTO demand = service.create(dto, connectedUser.getName());
        return new ResponseEntity<>(demand, HttpStatus.CREATED);
    }
}
