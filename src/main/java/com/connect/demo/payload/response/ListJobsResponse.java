package com.connect.demo.payload.response;

import com.connect.demo.models.Industry;
import com.connect.demo.models.Job;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;


@Data
public class ListJobsResponse {
    @Setter(AccessLevel.NONE)
    List<Job> data;

    Integer pageNo;
    Integer lastPage;
    Long totalElements;


    public ListJobsResponse(Page page) {
        this.data = page.getContent();
        this.pageNo = page.getPageable().getPageNumber();
        this.lastPage = page.getTotalPages();
        this.totalElements = page.getTotalElements();
    }
}