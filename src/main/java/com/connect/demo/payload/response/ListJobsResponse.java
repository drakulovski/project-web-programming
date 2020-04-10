package com.connect.demo.payload.response;

import com.connect.demo.models.Industry;
import com.connect.demo.models.Job;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import java.util.List;


@Data
public class ListJobsResponse {
    @Setter(AccessLevel.NONE)
    List<Job> jobList;

    public ListJobsResponse(List<Job> jobList) {
        this.jobList = jobList;
    }
}