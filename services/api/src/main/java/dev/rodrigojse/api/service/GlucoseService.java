package dev.rodrigojse.api.service;

import dev.rodrigojse.api.database.model.GlucoseEntity;
import dev.rodrigojse.api.database.repository.GlucoseRepository;
import dev.rodrigojse.api.dto.glucose.GlucoseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GlucoseService {
    private final GlucoseRepository repository;

    public GlucoseDTO getById(UUID id) throws Exception {
        GlucoseEntity entity = repository.findById(id).orElseThrow(() -> new Exception("Glucose not found!"));

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

        boolean alreadyExists = repository.existsByMealPeriodAndCreatedAtBetween(
                dto.getMealPeriod(),
                startOfDay,
                endOfDay
        );

        if (alreadyExists) throw new Exception("Glycemic data already exists for today");

        GlucoseEntity entity = new GlucoseEntity();

        entity.setMessage(dto.getMessage());
        entity.setValue(dto.getValue());
        entity.setRecommendation(dto.getRecommendation());
        entity.setNote(dto.getNote());
        entity.setSource(dto.getSource());
        entity.setMealPeriod(dto.getMealPeriod());

        GlucoseEntity glucose = repository.save(entity);
        return convertToDto(glucose);
    }

    public GlucoseDTO update(UUID id, GlucoseDTO dto) throws Exception {
        GlucoseEntity entity = repository.findById(id).orElseThrow(() -> new Exception("Glucose not found!"));

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
