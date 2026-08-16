package dev.rodrigojse.api.service;

import dev.rodrigojse.api.database.model.GlucoseEntity;
import dev.rodrigojse.api.database.repository.GlucoseRepository;
import dev.rodrigojse.api.dto.GlucoseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GlucoseService {
    @Autowired
    private GlucoseRepository repository;

    public GlucoseDTO getById(UUID id) throws Exception {
        GlucoseEntity entity = repository.findById(id).orElseThrow(() -> new Exception("Não encontrada"));

        return convertToDto(entity);
    }

    public List<GlucoseDTO> getAll() {
        return repository.findAll()
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    public GlucoseDTO create(GlucoseDTO dto) throws Exception {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        boolean alredyExists = repository.existsByMealPeriodAndCreatedAtBetween(
                dto.getMealPeriod(),
                startOfDay,
                endOfDay
        );

        if (alredyExists) throw new Exception("Já cadastrado para essa refeição");


        GlucoseEntity entity = new GlucoseEntity();
        entity.setValue(dto.getValue());
        entity.setMealPeriod(dto.getMealPeriod());
        GlucoseEntity glucose = repository.save(entity);

        return convertToDto(glucose);
    }

    public GlucoseDTO update(UUID id, GlucoseDTO dto) throws Exception {
        GlucoseEntity entity = repository.findById(id).orElseThrow(() -> new Exception("Probrema"));
        entity.setValue(dto.getValue());
        entity.setMealPeriod(dto.getMealPeriod());
        GlucoseEntity updatedEntity = repository.save(entity);

        return convertToDto(updatedEntity);
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }

    private GlucoseDTO convertToDto(GlucoseEntity entity) {
        return new GlucoseDTO(
                entity.getValue(),
                entity.getSource(),
                entity.getMessage(),
                entity.getNote(),
                entity.getRecommendation(),
                entity.getMealPeriod(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
