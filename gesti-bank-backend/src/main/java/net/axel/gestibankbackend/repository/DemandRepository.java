package net.axel.gestibankbackend.repository;

import net.axel.gestibankbackend.domain.entities.Demand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandRepository extends JpaRepository<Demand, Long> {
}
