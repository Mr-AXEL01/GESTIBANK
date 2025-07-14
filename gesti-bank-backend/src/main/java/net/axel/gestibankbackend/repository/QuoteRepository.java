package net.axel.gestibankbackend.repository;

import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.entities.Quote;
import net.axel.gestibankbackend.domain.enums.QuoteStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Long> {

    int countByCreatedBy(AppUser user);
    int countByCreatedByAndStatus(AppUser user, QuoteStatus status);
}
