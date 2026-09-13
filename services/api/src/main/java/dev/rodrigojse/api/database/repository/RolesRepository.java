package dev.rodrigojse.api.database.repository;

import dev.rodrigojse.api.database.model.RolesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<RolesEntity, Integer> {
}
