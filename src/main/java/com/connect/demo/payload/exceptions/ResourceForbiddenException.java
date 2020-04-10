package com.connect.demo.payload.exceptions;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceForbiddenException extends RuntimeException {
        public ResourceForbiddenException() {
            super();
        }

        public ResourceForbiddenException(String message) {
            super(message);
        }

        public ResourceForbiddenException(String message, Throwable cause) {
            super(message, cause);
        }
    }
