package com.connect.demo.payload.response;

import com.connect.demo.models.Industry;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import java.util.List;

@Data
public class ListIndustriesResponse {
        @Setter(AccessLevel.NONE)
        List<Industry> industryList;

        public ListIndustriesResponse(List<Industry> industryList) {
            this.industryList = industryList;
        }
}
