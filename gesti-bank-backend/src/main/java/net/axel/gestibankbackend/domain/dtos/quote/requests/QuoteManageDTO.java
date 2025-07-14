package net.axel.gestibankbackend.domain.dtos.quote.requests;

import org.springframework.web.multipart.MultipartFile;

public record QuoteManageDTO(
        MultipartFile attachedFile,
        Long quoteId
) {
}
