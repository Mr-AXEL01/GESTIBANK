package net.axel.gestibankbackend.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandRequestDTO;
import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandUpdateDTO;
import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandValidateDTO;
import net.axel.gestibankbackend.domain.dtos.demand.responses.DemandResponseDTO;
import net.axel.gestibankbackend.domain.entities.Demand;
import net.axel.gestibankbackend.service.DemandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(DemandController.CONTROLLER_PATH)

@RequiredArgsConstructor
public class DemandController {

    public final static String CONTROLLER_PATH = "api/v1/demands";

    private final DemandService service;

    @PreAuthorize("hasAnyRole('AGENT', 'RESPONSIBLE')")
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

    @PreAuthorize("hasAnyRole('AGENT', 'RESPONSIBLE')")
    @GetMapping("/{id}")
    public ResponseEntity<DemandResponseDTO> getDemandById(@PathVariable("id") Long id) {
        DemandResponseDTO demand = service.findById(id);
        return ResponseEntity.ok(demand);
    }

    @PreAuthorize("hasAnyRole('RESPONSIBLE', 'TECHNICIAN')")
    @PostMapping("/validate")
    public ResponseEntity<DemandResponseDTO> validateDemand(@RequestBody @Valid DemandValidateDTO dto,
                                                 Principal connectedUser) {
        DemandResponseDTO demand = service.validate(dto, connectedUser.getName());
        return ResponseEntity.ok(demand);
    }

    @PreAuthorize("hasAnyRole('AGENT', 'RESPONSIBLE')")
    @PutMapping
    public ResponseEntity<DemandResponseDTO> update(@RequestBody @Valid DemandUpdateDTO dto,
                                                    Principal connectedUser) {
        DemandResponseDTO demand = service.update(dto, connectedUser.getName());
        return ResponseEntity.ok(demand);
    }
}
