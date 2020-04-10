package com.connect.demo.repository;

import com.connect.demo.models.Industry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IndustryRepository extends JpaRepository<Industry,Long> {
    @Override
    Optional<Industry> findById(Long aLong);

    @Override
    Page<Industry> findAll(Pageable pageable);
}
