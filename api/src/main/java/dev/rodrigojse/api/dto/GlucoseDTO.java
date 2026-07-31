package dev.rodrigojse.api.dto;

import dev.rodrigojse.api.database.enums.MealPeriod;
import dev.rodrigojse.api.database.enums.Source;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GlucoseDTO {
    @Min(value = 20, message = "The blood glucose level must not be lower than 20; if it is, go to the hospital immediately.")
    @Max(value = 600, message = "The blood glucose level cannot exceed 600; if it does, go to the hospital immediately")
    @NotNull(message = "The glycemic value is mandatory.")
    private Integer value;

    @NotNull(message = "Please fill source name field")
    private Source source;

    @NotNull(message = "Message value is mandatory.")
    private String message;

    private String note;
    private String recommendation;

    @NotNull(message = "The meal period is mandatory.")
    private MealPeriod mealPeriod;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
