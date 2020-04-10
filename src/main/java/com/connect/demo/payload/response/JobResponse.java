package com.connect.demo.payload.response;
import com.connect.demo.models.Job;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
public class JobResponse {
        @Setter(AccessLevel.NONE)
        Job job;
        public JobResponse(Job job){
            this.job = job;
        }
    }
