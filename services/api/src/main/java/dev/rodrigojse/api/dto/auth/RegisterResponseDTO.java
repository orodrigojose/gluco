package dev.rodrigojse.api.dto.auth;

import java.util.UUID;

public record RegisterResponseDTO(
        UUID id,
        String email,
        String username
) {}
