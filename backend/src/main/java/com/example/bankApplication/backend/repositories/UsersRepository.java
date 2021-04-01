package com.example.bankApplication.backend.repositories;

import com.example.bankApplication.backend.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UsersRepository extends CrudRepository<Users, Long> {

}