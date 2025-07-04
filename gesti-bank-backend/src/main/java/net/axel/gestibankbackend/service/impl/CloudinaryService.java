package net.axel.gestibankbackend.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import net.axel.gestibankbackend.service.FileUploader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@RequiredArgsConstructor
public class CloudinaryService implements FileUploader {

    private final Cloudinary cloudinary;

    @Value("${app.cloudinary.upload.base-folder}")
    private String baseFolder;

    @Override
    public String upload(MultipartFile multipartFile) {
        try {
            var tempFile = createTempPath(multipartFile);
            var folder = cloudinary.uploader().upload(tempFile.toFile(), ObjectUtils.asMap("folder", baseFolder)    );
            return (String) folder.get("url");
        } catch (IOException e) {
            throw new ImageUploadException("Failed to upload file to cloudinary: " + e);
        }
    }

    private Path createTempPath(MultipartFile multipartFile) throws IOException {
        Path tempFile = Files.createTempFile("temp", multipartFile.getOriginalFilename());
        try (OutputStream outputStream = Files.newOutputStream(tempFile)) {
            outputStream.write(multipartFile.getBytes());
        }
        return tempFile;
    }

    private static class ImageUploadException extends RuntimeException {
        public ImageUploadException(String message) {
            super(message);
        }
    }
}