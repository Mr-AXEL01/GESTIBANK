package net.axel.gestibankbackend.web;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.user.responses.ProviderStatisticsDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.TechnicianStatisticsDTO;
import net.axel.gestibankbackend.domain.dtos.user.responses.UserStatisticsDTO;
import net.axel.gestibankbackend.service.DemandService;
import net.axel.gestibankbackend.service.QuoteService;
import net.axel.gestibankbackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(StatisticController.CONTROLLER_PATH)

@RequiredArgsConstructor
public class StatisticController {

    public final static String CONTROLLER_PATH = "api/v1/statistics";

    private final QuoteService quoteService;
    private final DemandService demandService;

    @PreAuthorize("hasAnyRole('AGENT', 'RESPONSIBLE')")
    @GetMapping("/demands")
    public ResponseEntity<UserStatisticsDTO> getUserStats(Principal connectedUser) {
        return ResponseEntity.ok(demandService.getUserStats(connectedUser.getName()));
    }

    @PreAuthorize("hasRole('TECHNICIAN')")
    @GetMapping("/technician")
    public ResponseEntity<TechnicianStatisticsDTO> getTechnicianStats() {
        return ResponseEntity.ok(demandService.getTechStats());
    }

    @PreAuthorize("hasRole('PROVIDER')")
    @GetMapping("/provider")
    public ResponseEntity<ProviderStatisticsDTO> getProviderStats(Principal connectedUser) {
        return ResponseEntity.ok(quoteService.getProviderStats(connectedUser.getName()));
    }

}
