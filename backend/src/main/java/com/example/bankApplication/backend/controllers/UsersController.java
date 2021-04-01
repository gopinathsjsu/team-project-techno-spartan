package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.models.Users;
import com.example.bankApplication.backend.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    // get all users
    @GetMapping("")
    public Iterable<Users> getAll()
    {
        return usersRepository.findAll();
    }

    //Create user rest api
    @PostMapping("")
    public Users transfer(@RequestBody Users user)
    {
        return usersRepository.save(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Users> getuserById(@PathVariable Long id)
    {
        Users user= usersRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));
        return ResponseEntity.ok(user);
    }
}
