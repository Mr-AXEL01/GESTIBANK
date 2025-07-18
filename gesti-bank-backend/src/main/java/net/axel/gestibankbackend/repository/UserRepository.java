package net.axel.gestibankbackend.repository;

import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.enums.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);
    boolean existsByRole(AppRole role);
}
