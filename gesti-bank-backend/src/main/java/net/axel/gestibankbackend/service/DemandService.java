package net.axel.gestibankbackend.service;

import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandRequestDTO;
import net.axel.gestibankbackend.domain.dtos.demand.responses.DemandResponseDTO;

public interface DemandService {

    DemandResponseDTO create(DemandRequestDTO dto, String email);
}
