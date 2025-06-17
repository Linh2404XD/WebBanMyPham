package com.webanmypham.backend.dto;

import com.webanmypham.backend.model.Role;
import com.webanmypham.backend.model.User;
import lombok.Data;

import java.util.Set;

@Data
public class UserDTO {
    private String phoneNumber;
    private String fullName;
    private String username;
    private String email;
    private String address;
    private Set<Role> roles;

    public UserDTO() {}

    public UserDTO(User user) {
        this.phoneNumber = user.getPhoneNumber();
        this.fullName = user.getFullName();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.address = user.getAddress();
        this.roles = user.getRoles();
    }
}
