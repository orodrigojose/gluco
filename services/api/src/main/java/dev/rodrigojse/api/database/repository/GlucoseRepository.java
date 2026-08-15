package dev.rodrigojse.api.database.repository;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.rodrigojse.api.database.enums.MealPeriod;
import dev.rodrigojse.api.database.model.GlucoseEntity;

public interface GlucoseRepository extends JpaRepository<GlucoseEntity, UUID> {

    boolean existsByMealPeriodAndCreatedAtBetween(
            MealPeriod mealPeriod,
            LocalDateTime startOfDay,
            LocalDateTime endOfDay
    );

}
