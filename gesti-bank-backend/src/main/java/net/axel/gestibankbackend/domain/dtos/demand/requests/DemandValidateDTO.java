package net.axel.gestibankbackend.domain.dtos.demand.requests;

import net.axel.gestibankbackend.domain.dtos.comment.requests.CommentRequestDTO;

public record DemandValidateDTO(
        String demandStatus,
        CommentRequestDTO comment
) {
}
