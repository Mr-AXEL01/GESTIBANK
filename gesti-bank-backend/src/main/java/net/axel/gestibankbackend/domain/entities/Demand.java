package net.axel.gestibankbackend.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.axel.gestibankbackend.domain.enums.DemandStatus;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "demands")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Demand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private DemandStatus status;

    @ManyToOne
    private AppUser createdBy;

    private Instant createdAt;

    @OneToMany(mappedBy = "demand", cascade = CascadeType.ALL)
    private List<Article> articles = new ArrayList<>();

    @OneToMany(mappedBy = "demand", cascade = CascadeType.ALL)
    private List<Quote> quotes = new ArrayList<>();

    private String attachedFile;

    public static Demand createDemand(String title, String description, String fileUrl, AppUser creator) {
        Demand demand = new Demand();
        return demand.setTitle(title)
                .setDescription(description)
                .setStatus(DemandStatus.CREATED)
                .setCreatedAt(Instant.now())
                .setCreatedBy(creator)
                .setAttachedFile(fileUrl);
    }
}
