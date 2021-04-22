package com.example.bankApplication.backend.repositories;

import com.example.bankApplication.backend.models.UserAccounts;
import com.example.bankApplication.backend.models.UserAccountsIdCpk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserAccountsRepository extends CrudRepository<UserAccounts, UserAccountsIdCpk> {

   Iterable<UserAccounts> findAllByUserId(long id);

   boolean existsByAccountIdAndUserId(Long id, long userId);

   boolean existsByUserId(long userId);
}