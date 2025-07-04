package net.axel.gestibankbackend.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.axel.gestibankbackend.domain.enums.CommentType;

import java.time.Instant;

@Entity
@Table(name = "comments")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private AppUser createdBy;

    private String content;

    private Instant createdAt;

    private CommentType type;

    @ManyToOne
    @JoinColumn(name = "demand_id")
    private Demand demand;

    @ManyToOne
    @JoinColumn(name = "quote_id")
    private Quote quote;
}
