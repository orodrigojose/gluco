package dev.rodrigojse.api.dto.auth;

public record TokenResponseDTO(String token, Long expirationTime) {
}
