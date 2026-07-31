package dev.rodrigojse.api.database.model;

import dev.rodrigojse.api.database.enums.MealPeriod;
import dev.rodrigojse.api.database.enums.Source;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "glico")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GlucoseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private Integer value;

    @Enumerated(EnumType.STRING)
    private Source source;
    private String message;
    private String note;
    private String recommendation;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_period", nullable = false)
    private MealPeriod mealPeriod;


    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
