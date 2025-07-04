package net.axel.gestibankbackend.service.impl;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandRequestDTO;
import net.axel.gestibankbackend.domain.dtos.demand.responses.DemandResponseDTO;
import net.axel.gestibankbackend.repository.DemandRepository;
import net.axel.gestibankbackend.service.DemandService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

@RequiredArgsConstructor
public class DemandServiceImpl implements DemandService {

    private final DemandRepository repository;

    @Override
    public DemandResponseDTO create(DemandRequestDTO dto) {
        return null;
    }
}
