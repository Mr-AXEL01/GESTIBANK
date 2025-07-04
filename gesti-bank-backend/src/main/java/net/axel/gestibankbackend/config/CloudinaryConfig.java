package net.axel.gestibankbackend.config;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    Cloudinary cloudinary(@Value("${app.cloudinary.url}") String cloudinaryUrl) {
        System.out.println("Cloudinary URL = " + cloudinaryUrl);
        return new Cloudinary(cloudinaryUrl);
    }
}
