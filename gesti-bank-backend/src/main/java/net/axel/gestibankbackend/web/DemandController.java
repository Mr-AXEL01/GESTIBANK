package net.axel.gestibankbackend.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandRequestDTO;
import net.axel.gestibankbackend.domain.dtos.demand.responses.DemandResponseDTO;
import net.axel.gestibankbackend.domain.entities.Demand;
import net.axel.gestibankbackend.service.DemandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<DemandResponseDTO>> getAllDemands(@RequestParam(defaultValue = "0") int page,
                                                                 @RequestParam(defaultValue = "10") int size) {
        List<DemandResponseDTO> demand = service.findAll(page, size);
        return ResponseEntity.ok(demand);
    }

    @GetMapping("/{id}")
    pub
}
