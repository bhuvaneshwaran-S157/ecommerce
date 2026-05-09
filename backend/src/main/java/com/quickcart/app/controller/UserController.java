package com.quickcart.app.controller;

import com.quickcart.app.dto.UserDto;
import com.quickcart.app.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto.Response> register(@Valid @RequestBody UserDto.RegisterRequest req) {
        return ResponseEntity.ok(userService.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto.Response> login(@Valid @RequestBody UserDto.LoginRequest req) {
        return ResponseEntity.ok(userService.login(req));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto.Response> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto.Response> updateUser(@PathVariable Long id,
                                                        @RequestBody UserDto.UpdateRequest req) {
        return ResponseEntity.ok(userService.update(id, req));
    }
}
