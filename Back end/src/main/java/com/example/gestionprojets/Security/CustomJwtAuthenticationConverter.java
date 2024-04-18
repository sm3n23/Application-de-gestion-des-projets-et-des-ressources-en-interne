package com.example.gestionprojets.Security;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.stream.Collectors;
public class CustomJwtAuthenticationConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = new HashSet<>();
        // Get roles from the token and convert them to GrantedAuthority objects
        Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
        if (realmAccess != null && realmAccess.containsKey("roles")) {
            @SuppressWarnings("unchecked")
            Collection<String> roles = (Collection<String>) realmAccess.get("roles");
            authorities.addAll(roles.stream()
                    .map(roleName -> "ROLE_" + roleName) // This is assuming your roles in Keycloak have the 'ROLE_' prefix
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList()));
        }
        // You can also add other claims as authorities if needed
        return authorities;
    }


    private Collection<GrantedAuthority> extractAuthorities(Jwt jwt) {
        // Default authorities converter (for scope-based authorities)
        JwtGrantedAuthoritiesConverter defaultAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        Collection<GrantedAuthority> authorities = new HashSet<>(defaultAuthoritiesConverter.convert(jwt));

        // Extracting realm_access roles
        Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
        if (realmAccess != null && realmAccess.containsKey("roles")) {
            @SuppressWarnings("unchecked")
            Collection<String> roles = (Collection<String>) realmAccess.get("roles");
            authorities.addAll(roles.stream()
                    .map(role -> "ROLE_" + role.toUpperCase()) // Prefix ROLE_ to align with Spring Security conventions
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toSet()));
        }

        return authorities;
    }
}
