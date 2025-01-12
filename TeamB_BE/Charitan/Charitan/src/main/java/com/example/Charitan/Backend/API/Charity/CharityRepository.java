package com.example.Charitan.Backend.API.Charity;

import com.example.Charitan.Backend.DataModel.Charity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CharityRepository extends JpaRepository <Charity, Long> {

    //Custom query find charity by email
    Optional<Charity> findByEmail(String email);
}
