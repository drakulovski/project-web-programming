package com.connect.demo.controllers;

import com.connect.demo.models.Industry;
import com.connect.demo.payload.exceptions.ResourceNotFoundException;
import com.connect.demo.payload.request.GetIndustriesRequest;
import com.connect.demo.payload.request.PostIndustryRequest;
import com.connect.demo.payload.response.ListIndustriesResponse;
import com.connect.demo.repository.IndustryRepository;
import com.connect.demo.security.services.UserDetailsImpl;
import com.connect.demo.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/api")
public class IndustryControllers {

    @Autowired
    IndustryRepository industryRepository;

    @GetMapping("/industries")
    public ResponseEntity<?> getIndustries(GetIndustriesRequest getIndustriesRequest){
        return ResponseEntity.ok(new ListIndustriesResponse(
           industryRepository.findAll()
        ));
    }

    @PostMapping("/industries")
    public ResponseEntity<?> postIndustry(@Valid @RequestBody Industry industry){
          industryRepository.save(industry);
          return ResponseEntity.ok(industry);
    }

    @DeleteMapping("/industries/{id}")
    public ResponseEntity<?> deleteIndustry(@PathVariable Long id){
        return industryRepository.findById(id).map(industry -> {
            industryRepository.delete(industry);
            return ResponseEntity.accepted().build();
        }).orElseThrow(()-> new ResourceNotFoundException("Industry with id "+ id +  " not found!"));
    }

}
