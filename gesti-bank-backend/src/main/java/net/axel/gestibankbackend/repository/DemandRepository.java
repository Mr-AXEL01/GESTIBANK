package net.axel.gestibankbackend.repository;

import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.entities.Demand;
import net.axel.gestibankbackend.domain.enums.DemandStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandRepository extends JpaRepository<Demand, Long> {

    int countByCreatedBy(AppUser user);
    int countByCreatedByAndStatus(AppUser user, DemandStatus status);
    int countByStatus(DemandStatus status);
}
