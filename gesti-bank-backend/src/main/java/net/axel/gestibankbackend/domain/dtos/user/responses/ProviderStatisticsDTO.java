package net.axel.gestibankbackend.domain.dtos.user.responses;

public record ProviderStatisticsDTO(
        int totalQuotesCreated,
        int totalAcceptedQuotes,
        int quotesPendingValidation
) {
}
