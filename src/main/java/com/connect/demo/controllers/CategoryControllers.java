package com.connect.demo.controllers;

import com.connect.demo.models.Category;
import com.connect.demo.models.Industry;
import com.connect.demo.payload.exceptions.ResourceNotFoundException;
import com.connect.demo.payload.request.GetIndustriesRequest;
import com.connect.demo.payload.request.PostCategoryRequest;
import com.connect.demo.payload.response.ListCategoriesResponse;
import com.connect.demo.payload.response.ListIndustriesResponse;
import com.connect.demo.repository.CategoryRepository;
import com.connect.demo.repository.IndustryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CategoryControllers {

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    IndustryRepository industryRepository;
    @GetMapping("/categories")
    public ResponseEntity<?> getIndustries(GetIndustriesRequest getIndustriesRequest){
        return ResponseEntity.ok(new ListCategoriesResponse(
           categoryRepository.findAll()
        ));
    }

    @PostMapping("/categories")
    public ResponseEntity<?> postIndustry(@RequestBody PostCategoryRequest postCategoryRequest){
        Category category = new Category();
        category.setName(postCategoryRequest.getName());
        return industryRepository.findById(postCategoryRequest.getIndustryId()).map(industry -> {
                category.setIndustry(industry);
                categoryRepository.save(category);
                return ResponseEntity.ok(category);
            }).orElseThrow(()-> new ResourceNotFoundException("Industry with id "+ postCategoryRequest.getIndustryId() + "not found!"));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<?> deleteIndustry(@PathVariable Long id){
        return categoryRepository.findById(id).map(industry -> {
            categoryRepository.delete(industry);
            return ResponseEntity.accepted().build();
        }).orElseThrow(()-> new ResourceNotFoundException("Category with id "+ id +  " not found!"));
    }

}
