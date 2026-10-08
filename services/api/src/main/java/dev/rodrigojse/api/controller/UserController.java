package dev.rodrigojse.api.controller;

import dev.rodrigojse.api.dto.user.UserDTO;
import dev.rodrigojse.api.response.ApiResponse;
import dev.rodrigojse.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Validated
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/v1/user/")
public class UserController {
    private final UserService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(service.getAll(), "Users retrieved successfully."));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(
                ApiResponse.success(service.getById(id), "User retrieved successfully.")
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> deleteUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success( service.deleteUser(id), "User deleted successfully!"));
    }
}
