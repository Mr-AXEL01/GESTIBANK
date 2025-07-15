package net.axel.gestibankbackend;

import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.enums.AppRole;
import net.axel.gestibankbackend.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class GestiBankBackendApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(GestiBankBackendApplication.class, args);

         UserRepository userRepository = context.getBean(UserRepository.class);
         PasswordEncoder passwordEncoder = context.getBean(PasswordEncoder.class);
         if (!userRepository.existsByRole(AppRole.ADMIN)) {
             AppUser admin = new AppUser(null, "admin", "admin", "admin@chaabi.com", passwordEncoder.encode("12345678"),
                     Instant.now(), AppRole.ADMIN, new ArrayList<>(), new ArrayList<>());

             userRepository.save(admin);
         }
    }

}
