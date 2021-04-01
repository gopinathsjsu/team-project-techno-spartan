package com.example.bankApplication.backend.repositories;

import com.example.bankApplication.backend.models.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
public interface AccountsRepository extends CrudRepository<Accounts, Long> {

}