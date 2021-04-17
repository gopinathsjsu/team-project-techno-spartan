package com.example.bankApplication.backend.repositories;

import com.example.bankApplication.backend.models.Accounts;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountsRepository extends CrudRepository<Accounts, Long> {

    //for JUnit test
    @Query("SELECT t FROM Accounts t where t.userId = :userId")
    List<Accounts> findAccountsByUserId(@Param("userId") long userId);
}