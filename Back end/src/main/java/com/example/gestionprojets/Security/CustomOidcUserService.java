package com.example.gestionprojets.Security; // Adjust this to your actual package

import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Service.EmployeeService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomOidcUserService extends OidcUserService {

    @Autowired
    private EmployeeService employeeService;

    @Override
    public OidcUser loadUser(OidcUserRequest oidcUserRequest) {
        OidcUser oidcUser = super.loadUser(oidcUserRequest);

        String email = oidcUser.getAttribute("email");
        Employee employee = employeeService.findByEmail(email);

        Set<GrantedAuthority> mappedAuthorities = new HashSet<>();
        mappedAuthorities.addAll(oidcUser.getAuthorities());
        if (employee != null) {
            mappedAuthorities.addAll(employee.getRoles().stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role.toUpperCase().replace(" ", "_")))
                    .collect(Collectors.toList()));
        }

        return new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
    }
}
