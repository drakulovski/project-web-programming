package com.connect.demo.controllers;

import com.connect.demo.models.Category;
import com.connect.demo.payload.exceptions.ResourceNotFoundException;
import com.connect.demo.payload.request.GetIndustriesRequest;
import com.connect.demo.payload.response.ListCategoriesResponse;
import com.connect.demo.repository.CategoryRepository;
import com.connect.demo.repository.IndustryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CategoryControllers {

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    IndustryRepository industryRepository;
    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(GetIndustriesRequest getIndustriesRequest){
        return ResponseEntity.ok(new ListCategoriesResponse(
           categoryRepository.findAll()
        ));
    }

    @PostMapping("/categories")
    public ResponseEntity<?> postCategory(@RequestBody Category category){
        categoryRepository.save(category);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id){
        return categoryRepository.findById(id).map(industry -> {
            categoryRepository.delete(industry);
            return ResponseEntity.accepted().build();
        }).orElseThrow(()-> new ResourceNotFoundException("Category with id "+ id +  " not found!"));
    }

}
