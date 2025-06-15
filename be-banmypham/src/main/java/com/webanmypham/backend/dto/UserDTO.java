package com.webanmypham.backend.dto;

import com.webanmypham.backend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class UserDTO {
    private String phoneNumber;
    private String fullName;
    private String username;
    private String address;
    private Set<Role> roles;
}
