package dev.prometheus.grouping.service;

import dev.prometheus.grouping.dto.ApiResponse;
import dev.prometheus.grouping.model.User;
import dev.prometheus.grouping.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final OTPService otpService;
    private final MailService mailService;
    private final JwtService jwtService;

    private static final int COOKIE_MAX_AGE = 86400;

    public AuthService(UserRepository userRepository, OTPService otpService,
                       MailService mailService, JwtService jwtService) {
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }

    public void sendOtp(String email) {
        String otpCode = otpService.generateOTP();
        otpService.storeOTPAndSendToUser(email, otpCode);
        mailService.SendEmail(email, otpCode);
    }

    public ApiResponse register(String email, String password, String otpCode) {
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            return new ApiResponse(false, "Email is already registered.", null);
        }
        if (!otpService.verifyOTP(email, otpCode)) {
            return new ApiResponse(false, "Invalid OTP code.", null);
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        userRepository.save(user);

        return new ApiResponse(true, "Registration successful.", user);
    }

    public ApiResponse login(String email, String password, HttpServletResponse response) {
        User user = userRepository.findByEmail(email);
        if (user == null || !user.verifyPassword(password)) {
            return new ApiResponse(false, "Invalid Credentials", null);
        }
        String token = jwtService.generateToken(email);
        Cookie jwtCookie = new Cookie("jwt_token", token);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(COOKIE_MAX_AGE);
        String sameSiteAttribute = "SameSite=Strict";
        response.setHeader("Set-Cookie",
                String.format("%s=%s; Max-Age=%d; Path=/; HttpOnly; Secure; %s",
                        jwtCookie.getName(),
                        jwtCookie.getValue(),
                        jwtCookie.getMaxAge(),
                        sameSiteAttribute));

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("user", user);
        responseData.put("token", token);
        return new ApiResponse(true, "Login successful", responseData);
    }

    public void logout(HttpServletResponse response) {
        Cookie jwtCookie = new Cookie("jwt_token", null);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);
        response.addCookie(jwtCookie);
    }
}