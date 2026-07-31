package dev.rodrigojse.api.database.repository;

import dev.rodrigojse.api.database.enums.MealPeriod;
import dev.rodrigojse.api.database.model.GlucoseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.Optional;

public interface GlucoseRepository extends JpaRepository<GlucoseEntity, UUID> {

    boolean existsByMealPeriodAndCreatedAtBetween(
            MealPeriod mealPeriod,
            LocalDateTime startOfDay,
            LocalDateTime endOfDay
    );

}
