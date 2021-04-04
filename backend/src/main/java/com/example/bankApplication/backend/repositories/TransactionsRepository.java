package com.example.bankApplication.backend.repositories;

import com.example.bankApplication.backend.models.TransactionsDbModel;
import org.springframework.data.repository.CrudRepository;

public interface TransactionsRepository extends CrudRepository<TransactionsDbModel, Long> {

}