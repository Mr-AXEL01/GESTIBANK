package net.axel.gestibankbackend.domain.dtos.user.responses;

public record UserStatisticsDTO(
        int totalDemandsCreated,
        int totalClosedDemands,
        int pendingDemands,
        int rejectedDemands
) {
}
