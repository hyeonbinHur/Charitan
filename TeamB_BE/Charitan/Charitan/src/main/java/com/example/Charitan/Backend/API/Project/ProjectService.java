package com.example.Charitan.Backend.API.Project;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Charitan.Backend.DataModel.Project;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    // Đọc tất cả Projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Tạo mới Project
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    // Cập nhật Project
    public Project updateProject(Long id, Project updatedProject) {
        Optional<Project> existingProject = projectRepository.findById(id);
        if (existingProject.isPresent()) {
            Project project = existingProject.get();
            project.setTitle(updatedProject.getTitle());
            project.setDescription(updatedProject.getDescription());
            project.setCategory(updatedProject.getCategory());
            project.setTargetAmount(updatedProject.getTargetAmount());
            project.setCurentFunding(updatedProject.getCurentFunding());
            project.setProjectStatus(updatedProject.getProjectStatus());
            project.setUpdateAt(updatedProject.getUpdateAt());
            project.setBankAccount(updatedProject.getBankAccount());
            project.setCharityName(updatedProject.getCharityName());
            project.setThumbnail(updatedProject.getThumbnail());
            project.setHightlight(updatedProject.getHightlight()); 
            return projectRepository.save(project);
        }
        throw new RuntimeException("Project isn't exist: " + id);
    }

    // Xóa Project theo ID
    public void deleteProjectById(Long id) {
        projectRepository.deleteById(id);
    }
}
