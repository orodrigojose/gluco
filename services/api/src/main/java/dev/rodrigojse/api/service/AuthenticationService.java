package dev.rodrigojse.api.service;

import dev.rodrigojse.api.config.TokenProvider;
import dev.rodrigojse.api.database.enums.RoleTypeEnum;
import dev.rodrigojse.api.database.model.RolesEntity;
import dev.rodrigojse.api.database.model.UserEntity;
import dev.rodrigojse.api.database.repository.RolesRepository;
import dev.rodrigojse.api.database.repository.UserRepository;
import dev.rodrigojse.api.dto.auth.LoginRequestDTO;
import dev.rodrigojse.api.dto.auth.RegisterRequestDTO;
import dev.rodrigojse.api.dto.auth.TokenResponseDTO;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;

    private final RolesRepository rolesRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final TokenProvider tokenProvider;

    @Value("${jwt.expiration}")
    private long expirationTime;

    public UserEntity register(RegisterRequestDTO dto) throws BadRequestException {
        System.out.println(dto.toString());
        UserEntity user  = userRepository.findByEmail(dto.getEmail()).orElse(null);

        if (user != null ) throw new BadRequestException("User exists");

        RolesEntity role = rolesRepository.findByName(RoleTypeEnum.COMMON.name())
                .orElseGet(() ->
                        rolesRepository.save(
                            RolesEntity
                            .builder()
                            .name(RoleTypeEnum.COMMON.name())
                            .build())
                        );

        System.out.println(role.toString());
        return userRepository.save(UserEntity.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .roles(Set.of(role))
                .password(passwordEncoder.encode(dto.getPassword()))
                .build());
    }

    public TokenResponseDTO login(LoginRequestDTO dto) throws Exception {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            dto.getEmail(),
                            dto.getPassword()
                    )
            );

            String token = tokenProvider.generateToken(auth);

            return new TokenResponseDTO(token, expirationTime);

        } catch (BadCredentialsException e) {
            throw new BadRequestException("Invalid credentials.");

        } catch (Exception e) {
            throw e;
        }

    }
}
