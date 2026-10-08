package dev.rodrigojse.api.database.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.UUID;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class RolesEntity implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="name")
    private String name;

    @Override
    public @Nullable String getAuthority() {
        if (name == null) {
            return null;
        }
        return name.startsWith("ROLE_") ? name : "ROLE_" + name;
    }

}
