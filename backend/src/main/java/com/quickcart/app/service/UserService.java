package com.quickcart.app.service;

import com.quickcart.app.dto.UserDto;
import com.quickcart.app.entity.User;
import com.quickcart.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDto.Response register(UserDto.RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail()))
            throw new RuntimeException("Email already registered");

        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // plain text (no security)
        user.setName(req.getName());
        user.setPhone(req.getPhone());
        user.setAddress(req.getAddress());
        return toResponse(userRepository.save(user));
    }

    public UserDto.Response login(UserDto.LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!user.getPassword().equals(req.getPassword()))
            throw new RuntimeException("Invalid credentials");
        return toResponse(user);
    }

    public UserDto.Response getById(Long id) {
        return toResponse(findById(id));
    }

    public UserDto.Response update(Long id, UserDto.UpdateRequest req) {
        User user = findById(id);
        if (req.getName() != null) user.setName(req.getName());
        if (req.getPhone() != null) user.setPhone(req.getPhone());
        if (req.getAddress() != null) user.setAddress(req.getAddress());
        return toResponse(userRepository.save(user));
    }

    private User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDto.Response toResponse(User user) {
        UserDto.Response res = new UserDto.Response();
        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setName(user.getName());
        res.setPhone(user.getPhone());
        res.setAddress(user.getAddress());
        res.setRole(user.getRole().name());
        return res;
    }
}
