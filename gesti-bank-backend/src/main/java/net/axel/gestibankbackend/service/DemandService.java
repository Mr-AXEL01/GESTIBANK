package net.axel.gestibankbackend.service;

import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandRequestDTO;
import net.axel.gestibankbackend.domain.dtos.demand.responses.DemandResponseDTO;

import java.util.List;

public interface DemandService {

    DemandResponseDTO create(DemandRequestDTO dto, String email);
    List<DemandResponseDTO> findAll(int page, int size);
}
