package net.axel.gestibankbackend.repository;

import net.axel.gestibankbackend.domain.entities.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
}
