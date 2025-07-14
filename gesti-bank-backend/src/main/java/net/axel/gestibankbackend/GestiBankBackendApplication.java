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

//        UserRepository userRepository = context.getBean(UserRepository.class);
//        PasswordEncoder passwordEncoder = context.getBean(PasswordEncoder.class);
//
//        AppUser agent = new AppUser(null, "agent", "agent", "agent@chaabi.com", passwordEncoder.encode("12345678"),
//                Instant.now(), AppRole.AGENT, new ArrayList<>(), new ArrayList<>());
//
//        AppUser responsible = new AppUser(null, "responsible", "responsible", "responsible@chaabi.com", passwordEncoder.encode("12345678"),
//                Instant.now(), AppRole.RESPONSIBLE, new ArrayList<>(), new ArrayList<>());
//
//        AppUser technician = new AppUser(null, "technician", "technician", "technician@chaabi.com", passwordEncoder.encode("12345678"),
//                Instant.now(), AppRole.TECHNICIAN, new ArrayList<>(), new ArrayList<>());
//
//        AppUser provider = new AppUser(null, "provider", "provider", "provider@chaabi.com", passwordEncoder.encode("12345678"),
//                Instant.now(), AppRole.PROVIDER, new ArrayList<>(), new ArrayList<>());
//
//        AppUser manager = new AppUser(null, "manager", "manager", "manager@chaabi.com", passwordEncoder.encode("12345678"),
//                Instant.now(), AppRole.MANAGER, new ArrayList<>(), new ArrayList<>());
//
//        AppUser admin = new AppUser(null, "admin", "admin", "admin@chaabi.com", passwordEncoder.encode("12345678"),
//                Instant.now(), AppRole.ADMIN, new ArrayList<>(), new ArrayList<>());
//
//        userRepository.saveAll(List.of(agent, responsible, technician, provider, manager, admin));
//        System.out.println("main users have been saved with them roles");
    }

}
