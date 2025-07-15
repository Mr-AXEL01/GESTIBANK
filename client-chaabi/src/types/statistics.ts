export interface UserStatisticsDTO {
  totalDemandsCreated: number;
  totalClosedDemands: number;
  pendingDemands: number;
  rejectedDemands: number;
}

export interface ProviderStatisticsDTO {
  totalQuotesCreated: number;
  totalAcceptedQuotes: number;
  quotesPendingValidation: number;
  totalRejectedQuotes: number;
}

export interface TechnicianStatisticsDTO {
  totalDemandsToValidated: number;
  validatedDemands: number;
  rejectedDemands: number;
}
