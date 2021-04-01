package com.example.bankApplication.backend.repositories;

import com.example.bankApplication.backend.models.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface TransactionsRepository extends CrudRepository<Transactions, Long> {

}