package dev.rodrigojse.api.service;

import dev.rodrigojse.api.database.model.UserEntity;
import dev.rodrigojse.api.database.repository.UserRepository;
import dev.rodrigojse.api.dto.user.UserDTO;
import dev.rodrigojse.api.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public UserDTO getById(UUID id) {
        UserEntity user = repository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        return convertToDTO(user);
    }

    public List<UserDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDTO).toList();
    }

    public UserDTO deleteUser(UUID id) {
        UserDTO user = this.getById(id);

        if (user != null) {
            repository.deleteById(id);
            return user;
        }

        throw new UserNotFoundException("Falha ao deletar usuário");
    }

    private UserDTO convertToDTO(UserEntity entity) {
        return new UserDTO(
                entity.getId(),
                entity.getEmail(),
                entity.getUsername(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()

        );
    }
}
