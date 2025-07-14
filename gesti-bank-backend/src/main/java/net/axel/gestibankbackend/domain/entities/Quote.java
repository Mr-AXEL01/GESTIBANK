package net.axel.gestibankbackend.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.axel.gestibankbackend.domain.enums.QuoteStatus;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quotes")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private AppUser createdBy;

    private Instant createdAt;

    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    private QuoteStatus status;

    @ManyToOne
    private Demand demand;

    @OneToMany(mappedBy = "quote", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    private String bonCommand;
    
    public static Quote createQuote(AppUser creator, Demand demand, Double totalAmount) {
        Quote quote = new Quote();
        return quote.setCreatedBy(creator)
                .setCreatedAt(Instant.now())
                .setTotalAmount(totalAmount)
                .setStatus(QuoteStatus.CREATED)
                .setDemand(demand);
    }
}
