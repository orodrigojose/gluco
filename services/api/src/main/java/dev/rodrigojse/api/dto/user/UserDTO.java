package dev.rodrigojse.api.dto.user;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserDTO(
        UUID id,
        String email,
        String username,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
