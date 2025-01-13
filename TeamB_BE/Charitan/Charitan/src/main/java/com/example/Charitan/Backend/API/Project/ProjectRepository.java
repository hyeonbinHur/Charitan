package com.example.Charitan.Backend.API.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Charitan.Backend.DataModel.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Long countByCharity_CharityId(Long charityId);
}


