package net.axel.gestibankbackend.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploader {
    String upload(MultipartFile multipartFile);
//    void delete(String publicId, String folderType);
}
