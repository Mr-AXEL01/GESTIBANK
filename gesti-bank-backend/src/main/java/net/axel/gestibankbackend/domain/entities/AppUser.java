package net.axel.gestibankbackend.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.axel.gestibankbackend.domain.enums.AppRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private Instant createdAt;

    @Enumerated(EnumType.STRING)
    private AppRole role;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
    private List<Demand> demands = new ArrayList<>();

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
    private List<Quote> quotes = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public static AppUser register(String firstName, String lastName, String email, String password, AppRole role) {
        AppUser newUser  = new AppUser();
        newUser.firstName    = firstName;
        newUser.lastName    = lastName;
        newUser.email    = email;
        newUser.password = password;
        newUser.role    = role;
        newUser.createdAt = Instant.now();
        return newUser;
    }
}
