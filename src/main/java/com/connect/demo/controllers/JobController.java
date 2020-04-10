package com.connect.demo.controllers;
import com.connect.demo.models.Category;
import com.connect.demo.models.Industry;
import com.connect.demo.models.Job;
import com.connect.demo.models.User;
import com.connect.demo.payload.exceptions.ResourceForbiddenException;
import com.connect.demo.payload.exceptions.ResourceNotFoundException;
import com.connect.demo.payload.request.PostJobRequest;
import com.connect.demo.payload.response.JobResponse;
import com.connect.demo.payload.response.ListJobsResponse;
import com.connect.demo.repository.CategoryRepository;
import com.connect.demo.repository.IndustryRepository;
import com.connect.demo.repository.JobRepository;
import com.connect.demo.repository.UserRepository;
import com.connect.demo.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/api")
public class JobController {

    @Autowired
    JobRepository jobRepository;
    @Autowired
    IndustryRepository industryRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    UserRepository userRepository;


    @GetMapping("/jobs")
    public ResponseEntity<?> getJobs(){
        return ResponseEntity.ok(new ListJobsResponse(
                jobRepository.findAll()
        ));
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<?> getJob(@PathVariable Long id){
            return jobRepository.findById(id).map(job -> {
                return ResponseEntity.ok(new JobResponse(job));
            }).orElseThrow(()-> new ResourceNotFoundException("Job with id "+ id +  " not found!"));
    }

    @PostMapping("/jobs")
    public ResponseEntity<?> postJob(@Valid @RequestBody PostJobRequest postJobRequest){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.getOne(userDetails.getId());
        Industry industry = industryRepository.getOne(postJobRequest.getIndustryId());
        Category category = categoryRepository.getOne(postJobRequest.getCategoryId());
        Job job = new Job(postJobRequest.getTitle(),postJobRequest.getDescription(),postJobRequest.getRate(),postJobRequest.getAvailable(),category,industry,user,postJobRequest.getQualifications(),postJobRequest.isRatePerDay(),postJobRequest.getLocation(),postJobRequest.isCompany(),postJobRequest.isAvailableOnWeekends());
        jobRepository.save(job);
        return ResponseEntity.ok(postJobRequest);
    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity<?> putJob(@Valid @RequestBody PostJobRequest postJobRequest,@PathVariable Long id){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Industry industry = industryRepository.getOne(postJobRequest.getIndustryId());
        Category category = categoryRepository.getOne(postJobRequest.getCategoryId());
        return jobRepository.findById(id).map(job->{
            if(userDetails.getId() == job.getUser().getId() || userDetails.getAuthorities().contains("admin")){
                job.setTitle(postJobRequest.getTitle());
                job.setDescription(postJobRequest.getDescription());
                job.setRate(postJobRequest.getRate());
                job.setAvailable(postJobRequest.getAvailable());
                job.setQualifications(postJobRequest.getQualifications());
                job.setAvailableOnWeekends(postJobRequest.isAvailableOnWeekends());
                job.setRatePerDay(postJobRequest.isRatePerDay());
                job.setLocation(postJobRequest.getLocation());
                job.setCompany(postJobRequest.isCompany());
                job.setCategory(category);
                job.setIndustry(industry);
                jobRepository.save(job);
                return ResponseEntity.accepted().build();
            }
            else{
                throw new ResourceForbiddenException("Forbidden");
            }

        }).orElseThrow(()-> new ResourceNotFoundException("Job with id "+ id +  " not found!"));
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return jobRepository.findById(id).map(job -> {
            if(userDetails.getId() == job.getUser().getId() || userDetails.getAuthorities().contains("admin")){
                jobRepository.delete(job);
                return ResponseEntity.accepted().build();
            }
            else{
                throw new ResourceForbiddenException("Forbidden");
            }
        }).orElseThrow(()-> new ResourceNotFoundException("Job with id "+ id +  " not found!"));
    }

}
