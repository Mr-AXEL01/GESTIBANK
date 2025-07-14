package net.axel.gestibankbackend.service;

import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandRequestDTO;
import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandUpdateDTO;
import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandValidateDTO;
import net.axel.gestibankbackend.domain.dtos.demand.responses.DemandResponseDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.TechnicianStatisticsDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.UserStatisticsDTO;
import net.axel.gestibankbackend.domain.entities.Demand;

import java.util.List;

public interface DemandService {

    DemandResponseDTO create(DemandRequestDTO dto, String email);

    DemandResponseDTO update(DemandUpdateDTO dto, String email);

    void updateStatus(Long id, String demandStatus);

    List<DemandResponseDTO> findAll(int page, int size);

    DemandResponseDTO findById(Long id);

    DemandResponseDTO validate(DemandValidateDTO dto, String email);

    Demand findDemandEntity(Long id);

    UserStatisticsDTO getUserStats(String email);

    TechnicianStatisticsDTO getTechStats();
}
