package dev.rodrigojse.api.controller;

import dev.rodrigojse.api.database.model.UserEntity;
import dev.rodrigojse.api.dto.auth.LoginRequestDTO;
import dev.rodrigojse.api.dto.auth.RegisterRequestDTO;
import dev.rodrigojse.api.dto.auth.RegisterResponseDTO;
import dev.rodrigojse.api.dto.auth.TokenResponseDTO;
import dev.rodrigojse.api.response.ApiResponse;
import dev.rodrigojse.api.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponseDTO>> register(@RequestBody  @Valid RegisterRequestDTO request) throws Exception {
        UserEntity user = service.register(request);

        RegisterResponseDTO registeredUser = new RegisterResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getUsername()
        );

        return ResponseEntity.ok(ApiResponse.success(registeredUser, "User registred successfully!"));
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse<TokenResponseDTO>> login(@RequestBody @Valid LoginRequestDTO loginRequestDTO) throws  Exception {
            return ResponseEntity.ok(ApiResponse.success(service.login(loginRequestDTO), "Login successfully!"));
    }

}
