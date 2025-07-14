package net.axel.gestibankbackend.domain.dtos.user.responses;

public record TechnicianStatisticsDTO(
        int totalDemandsToValidated,
        int validatedDemands,
        int rejectedDemands
) {
}
