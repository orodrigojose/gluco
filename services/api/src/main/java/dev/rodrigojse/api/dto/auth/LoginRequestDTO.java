package dev.rodrigojse.api.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class LoginRequestDTO {
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
