package com.noplay.gestionale.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.noplay.gestionale.entities.Azienda;

import com.noplay.gestionale.entities.Dipendente;
import com.noplay.gestionale.payload.UploadFileResponse;
import com.noplay.gestionale.repositories.CrudDipendente;

import com.noplay.gestionale.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.servlet.view.RedirectView;

import javax.management.RuntimeErrorException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/file")
public class FileController {
    private FileStorageService fs;

    // @Autowired
    // private CrudFile dao;

    @Autowired
    private CrudDipendente daoDip;

    @Autowired
    public FileController(FileStorageService fs) {
        this.fs = fs;

    }

    @PostMapping("/upload")
    public RedirectView uploadFile(@RequestParam MultipartFile file,
            @RequestParam(name = "id-dipendente-foto") Long id) {
        // @RequestBody Dipendente dipendente){

        String nomeFile = fs.salvaFile(file);
        System.out.println(nomeFile);
        System.out.println(id);
        Dipendente dipendente = daoDip.findById(id).orElse(null);
        dipendente.setPercorso(nomeFile);
        daoDip.save(dipendente);

        // return "redirect:localhost:8080/dipendenti";
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:8080/dipendenti.html");
        return redirectView;

        // String nomeFile = fs.salvaFile(file);
        // DBFile img = new DBFile(0L, nomeFile);
        // DBFile img = new DBFile(0L, nomeFile, new Dipendente());
        // dao.save(img);
        // Dipendente dip = new Dipendente(0L, null, null, null, 0, null, null, new
        // Azienda(0L, null, null, null, null, null), nomeFile);

    }


    // @RequestMapping("/to-be-redirected")
    // public RedirectView localRedirect() {

    // }

    @GetMapping("/download/{fileName}")
    public Resource downloadFile(@PathVariable String fileName) {
        return fs.loadFile(fileName);
    }

    // private static final Logger logger =
    // LoggerFactory.getLogger(FileController.class);

    // @Autowired
    // private FileStorageService fileStorageService;

    // @PostMapping("/uploadFile")
    // public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile
    // file) {
    // String fileName = fileStorageService.storeFile(file);

    // String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
    // .path("/downloadFile/")
    // .path(fileName)
    // .toUriString();

    // return new UploadFileResponse(fileName, fileDownloadUri,
    // file.getContentType(), file.getSize());
    // }

    // @PostMapping("/uploadMultipleFiles")
    // public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files")
    // MultipartFile[] files) {
    // return Arrays.asList(files)
    // .stream()
    // .map(file -> uploadFile(file))
    // .collect(Collectors.toList());
    // }

    // @GetMapping("/downloadFile/{fileName:.+}")
    // public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,
    // HttpServletRequest request) {
    // // Load file as Resource
    // Resource resource = fileStorageService.loadFileAsResource(fileName);

    // // Try to determine file's content type
    // String contentType = null;
    // try {
    // contentType =
    // request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
    // } catch (IOException ex) {
    // logger.info("Could not determine file type.");
    // }

    // // Fallback to the default content type if type could not be determined
    // if(contentType == null) {
    // contentType = "application/octet-stream";
    // }

    // return ResponseEntity.ok()
    // .contentType(MediaType.parseMediaType(contentType))
    // .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" +
    // resource.getFilename() + "\"")
    // .body(resource);
    // }

}
