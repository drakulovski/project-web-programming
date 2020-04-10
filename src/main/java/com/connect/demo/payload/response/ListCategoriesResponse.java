package com.connect.demo.payload.response;

import com.connect.demo.models.Category;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import java.util.List;

@Data
public class ListCategoriesResponse {
        @Setter(AccessLevel.NONE)
        List<Category> categoryList;

        public ListCategoriesResponse(List<Category> categoryList) {
            this.categoryList = categoryList;
        }
}
