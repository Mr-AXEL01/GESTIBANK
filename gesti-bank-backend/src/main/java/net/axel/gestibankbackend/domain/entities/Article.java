package net.axel.gestibankbackend.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Entity
@Table(name = "articles")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double price;

    private Integer quantity;

    @ManyToOne
    private Demand demand;

    public static Article createArticle(String name, String description, double price, int quantity, Demand demand) {
        Article article = new Article();
        return article.setName(name)
                .setDescription(description)
                .setPrice(price)
                .setQuantity(quantity)
                .setDemand(demand);
    }
}
