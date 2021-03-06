package com.connect.demo.repository;

import com.connect.demo.models.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends PagingAndSortingRepository<Job,Long> {
    @Override
    Optional<Job> findById(Long aLong);

    @Override
    List<Job> findAll();
}
