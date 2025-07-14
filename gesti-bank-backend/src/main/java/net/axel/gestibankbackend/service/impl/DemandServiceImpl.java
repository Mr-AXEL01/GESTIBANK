package net.axel.gestibankbackend.service.impl;

import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandRequestDTO;
import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandUpdateDTO;
import net.axel.gestibankbackend.domain.dtos.demand.requests.DemandValidateDTO;
import net.axel.gestibankbackend.domain.dtos.demand.responses.DemandResponseDTO;
import net.axel.gestibankbackend.domain.entities.AppUser;
import net.axel.gestibankbackend.domain.entities.Article;
import net.axel.gestibankbackend.domain.entities.Comment;
import net.axel.gestibankbackend.domain.entities.Demand;
import net.axel.gestibankbackend.domain.enums.AppRole;
import net.axel.gestibankbackend.domain.enums.DemandStatus;
import net.axel.gestibankbackend.exception.domains.ResourceNotFoundException;
import net.axel.gestibankbackend.mapper.DemandMapper;
import net.axel.gestibankbackend.repository.ArticleRepository;
import net.axel.gestibankbackend.repository.DemandRepository;
import net.axel.gestibankbackend.repository.UserRepository;
import net.axel.gestibankbackend.service.ArticleService;
import net.axel.gestibankbackend.service.CommentService;
import net.axel.gestibankbackend.service.DemandService;
import net.axel.gestibankbackend.service.FileUploader;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional

@RequiredArgsConstructor
public class DemandServiceImpl implements DemandService {

    private final DemandRepository repository;
    private final ArticleRepository articleRepository;
    private final ArticleService articleService;
    private final UserRepository userRepository;
    private final DemandMapper mapper;
    private final FileUploader fileUploader;
    private final CommentService commentService;

    @Override
    public DemandResponseDTO create(DemandRequestDTO dto, String email) {
        AppUser creator = getUser(email);

        String fileUrl = dto.attachedFile() != null && !dto.attachedFile().isEmpty()
                ? uploadFile(dto.attachedFile())
                : null;

        Demand demand = repository.save(
                Demand.createDemand(dto.title(), dto.description(), fileUrl, creator)
        );

        if (creator.getRole() == AppRole.RESPONSIBLE) demand.setStatus(DemandStatus.RESPONSIBLE_APPROVED);

        List<Article> articles = dto.articles().stream()
                .map(articleDto -> Article.createArticle(
                                articleDto.name(), articleDto.description(), articleDto.quantity(), demand
                        )
                ).toList();

        articleRepository.saveAll(articles);
        demand.setArticles(articles);

        return mapper.toResponseDto(demand);
    }

    @Override
    public DemandResponseDTO update(DemandUpdateDTO dto) {
        if (!repository.existsById(dto.id())) throw new ResourceNotFoundException("Can't update, demand not exists!");

        Demand demand = findDemandEntity(dto.id());
        demand.setTitle(dto.title())
                .setDescription(dto.description());

        List<Article> articles = dto.articles().stream()
                .map(articleDTO -> {
                    if (articleDTO.id() == null) {
                        Article article = Article.createArticle(
                                articleDTO.name(),
                                articleDTO.description(),
                                articleDTO.quantity(),
                                demand
                        );
                        return articleRepository.save(article);
                    } else {
                        return articleService.update(articleDTO);
                    }
                })
                .toList();

        demand.setArticles(articles);

        return mapper.toResponseDto(demand);
    }

    @Override
    public Demand findDemandEntity(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demand", id));
    }

    @Override
    public List<DemandResponseDTO> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        return repository.findAll(pageable)
                .stream()
                .map(mapper::toResponseDto)
                .toList();
    }

    @Override
    public DemandResponseDTO findById(Long id) {
        return mapper.toResponseDto(findDemandEntity(id));
    }

    @Override
    public DemandResponseDTO validate(DemandValidateDTO dto, String email) {
        AppUser user = getUser(email);
        Demand demand = findDemandEntity(dto.comment().demandId());
        String status = user.getRole()+"_"+dto.demandStatus().toUpperCase();
        demand.setStatus(DemandStatus.valueOf(status));

        Comment comment = commentService.create(dto.comment(), user);
        demand.getComments().add(comment);
        return mapper.toResponseDto(demand);
    }

    private String uploadFile(MultipartFile file) {
        return fileUploader.upload(file);
    }

    private AppUser getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Creator not exists in system"));
    }
}
