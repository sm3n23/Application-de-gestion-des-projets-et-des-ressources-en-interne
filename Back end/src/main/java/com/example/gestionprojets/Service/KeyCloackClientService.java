/*
package com.example.gestionprojets.Service;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.Collections;
//@Service
public class KeyCloackClientService {
    public void createUserInKeycloak(String username, String password) {
        Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl("http://localhost:8080/realms/app-realm/protocol/openid-connect/token")
                .realm("app-realm")
                .clientId("app-client")
                .clientSecret("aluTIQwCPql8oy5af0qwQxOPa6ABbHDS")
                .username("admin")
                .password("admin")
                .build();

        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(username);
        user.setFirstName("First");
        user.setLastName("Last");
        user.setEmail(username + "@example.com");

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(password);
        credential.setTemporary(false);

        user.setCredentials(Collections.singletonList(credential));

        Response response = keycloak.realms().realm("app-realm").users().create(user);

        if (response.getStatus() == 201) {
            System.out.println("User created successfully.");
        } else {
            System.out.println("Failed to create user. Status: " + response.getStatus());
        }

        response.close();
    }
}
*/
