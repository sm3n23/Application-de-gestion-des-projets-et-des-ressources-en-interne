package com.example.gestionprojets.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class CustomLoginController {

    private static final Logger logger = LoggerFactory.getLogger(CustomLoginController.class);

    @Value("${keycloak.auth-server-url}")
    private String authServerUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.resource}")
    private String clientId;

    @Value("${keycloak.credentials.secret}")
    private String clientSecret;

    private final RestTemplate restTemplate;
    private final UserDetailsService userDetailsService;

    public CustomLoginController(RestTemplate restTemplate, UserDetailsService userDetailsService) {
        this.restTemplate = restTemplate;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/custom-login-handler")
    public ResponseEntity<?> handleCustomLogin(@RequestParam String username, @RequestParam String password) {
        logger.info("Received login request for username: {}", username);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "password");
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("username", username);
        map.add("password", password);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        try {
            // Post request to Keycloak and get the response
            ResponseEntity<String> response = restTemplate.postForEntity(
                    authServerUrl + "/realms/" + realm + "/protocol/openid-connect/token", request, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                // Parse the response body to extract the token
                String responseBody = response.getBody();
                JSONObject jsonObject = new JSONObject(responseBody);
                String token = jsonObject.getString("access_token"); // Ensure this matches the token field name in Keycloak's JSON response

                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null,
                        userDetailsService.loadUserByUsername(username).getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // Extract roles from the authorities
                String roles = authentication.getAuthorities().stream()
                        .map(grantedAuthority -> grantedAuthority.getAuthority())
                        .collect(Collectors.joining(","));

                // Create a response object that includes the token
                Map<String, String> tokenResponse = new HashMap<>();
                tokenResponse.put("token", token);
                tokenResponse.put("role", roles);

                logger.info("Login successful for username: {}", username);
                return ResponseEntity.ok(tokenResponse);
            } else {
                logger.error("Login failed for username: {} with status code: {}", username, response.getStatusCode());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("login failed");
            }
        } catch (Exception e) {
            logger.error("Exception occurred during login for username: {}", username, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("login failed");
        }
    }
}