package com.quickcart.app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class UserDto {

    @Data
    public static class RegisterRequest {
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;
        @NotBlank
        private String name;
        private String phone;
        private String address;
    }

    @Data
    public static class LoginRequest {
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Data
    public static class UpdateRequest {
        private String name;
        private String phone;
        private String address;
    }

    @Data
    public static class Response {
        private Long id;
        private String email;
        private String name;
        private String phone;
        private String address;
        private String role;
    }
}
