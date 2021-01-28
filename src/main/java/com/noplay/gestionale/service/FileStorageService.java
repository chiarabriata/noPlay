package com.noplay.gestionale.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * Questo servizio ha il compito di salvare e caricare i file dall'disco fisso
 */
@Service
public class FileStorageService {
    /**
     * Percorso dove andremo a salvare i file
     */
    private final Path fileStorageLocation;

    /**
     *
     * @param uploadDir corrisponde alla stringa che descrive il percorso della cartella
     *                  Lo mettiamo in application.properties per comodità
     */
    public FileStorageService(@Value("${file.upload-dir}") String uploadDir) {
        fileStorageLocation = Paths.get(uploadDir + "/immagini")
                                   .toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception e) {
            System.err.println("Non è stato possibile creare la cartella dove uploadare i file");
        }
    }

    /**
     * Metodo che salva nel percorso definito il file che arriva da parametro
     * @param file Dal controller arriverà un oggetto di tipo MultiPartFile
     * @return Il nome del file (Il nome può essere poi utilizzato per essere, ad esempio, salvato nel DB
     */
    public String salvaFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // A partire dal percorso dove salvo i file ricavo il percorso che avrà il file
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            // Utilizzo Files per copiare il file arrivato da parametro nella specifica cartella
            // vado a sovrascrivere se esiste già
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileName;
    }

    /**
     * A partire dal nome del file carico, se esiste dal disco fisso
     * @param fileName
     * @return
     */
    public Resource loadFile(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return resource;
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

}






















// import org.springframework.stereotype.Service;
// import com.noplay.gestionale.property.FileStorageProperties;
// import com.noplay.gestionale.exception.FileStorageException;
// import com.noplay.gestionale.exception.MyFileNotFoundException;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.core.io.Resource;
// import org.springframework.core.io.UrlResource;
// import org.springframework.util.StringUtils;
// import org.springframework.web.multipart.MultipartFile;
// import java.io.IOException;
// import java.net.MalformedURLException;
// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.Paths;
// import java.nio.file.StandardCopyOption;

// @Service
// public class FileStorageService {

//     private final Path fileStorageLocation;

//     @Autowired
//     public FileStorageService(FileStorageProperties fileStorageProperties) {
//         this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
//                 .toAbsolutePath().normalize();

//         try {
//             Files.createDirectories(this.fileStorageLocation);
//         } catch (Exception ex) {
//             throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
//         }
//     }

//     public String storeFile(MultipartFile file) {
//         // Normalize file name
//         String fileName = StringUtils.cleanPath(file.getOriginalFilename());

//         try {
//             // Check if the file's name contains invalid characters
//             if(fileName.contains("..")) {
//                 throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
//             }

//             // Copy file to the target location (Replacing existing file with the same name)
//             Path targetLocation = this.fileStorageLocation.resolve(fileName);
//             Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

//             return fileName;
//         } catch (IOException ex) {
//             throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
//         }
//     }

//     public Resource loadFileAsResource(String fileName) {
//         try {
//             Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
//             Resource resource = new UrlResource(filePath.toUri());
//             if(resource.exists()) {
//                 return resource;
//             } else {
//                 throw new MyFileNotFoundException("File not found " + fileName);
//             }
//         } catch (MalformedURLException ex) {
//             throw new MyFileNotFoundException("File not found " + fileName, ex);
//         }
//     }
    
// }
