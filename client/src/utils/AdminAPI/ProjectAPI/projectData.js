// src/data/projectData.js

// Initial Projects Data
export const loadProjects = [
    {
      id: 1,
      name: 'Project one hunred days',
      status: 'pending',
      description: 'Description for Project Project one hunred days',
      managerName: 'John Doe',
      managerEmail: 'john@example.com',
      createdAt: '2023-12-10',
      endDate: '2024-01-10',
      paymentMethod: 'Bank Transfer',
      goal: 'Raise $10,000 for children education',
      current: '$4500',
      region: 'Asia',
    },
    {
      id: 2,
      name: 'Project infected',
      status: 'approved',
      description: 'Description for Project infected',
      managerName: 'Jane Doe',
      managerEmail: 'jane@example.com',
      createdAt: '2023-11-05',
      endDate: '2024-02-20',
      paymentMethod: 'PayPal',
      goal: 'Provide $1,500 meals for the homeless',
      current: '$1200',
      region: 'Africa',
    },
    {
        id: 3,
        name: 'Project cleaning river',
        status: 'rejected',
        description: 'Description for Project cleaning river',
        managerName: 'Jane Doe',
        managerEmail: 'jane@example.com',
        createdAt: '2023-11-05',
        endDate: '2024-02-20',
        paymentMethod: 'PayPal',
        goal: 'Provide $5,000 meals for the homeless',
        current: '$3500',
        region: 'America',
      },
      {
        id: 4,
        name: 'Project picking up trash',
        status: 'pending',
        description: 'Description for Project picking up trash',
        managerName: 'Jane Doe',
        managerEmail: 'jane@example.com',
        createdAt: '2023-11-05',
        endDate: '2024-02-20',
        paymentMethod: 'PayPal',
        goal: 'Provide $15,000 meals for the homeless',
        current: '$15000',
        region: 'Europe ',
      },
      {
        id: 5,
        name: 'Project lost child support center',
        status: 'pending',
        description: 'Description for Project lost child support center',
        managerName: 'Jane Doe',
        managerEmail: 'jane@example.com',
        createdAt: '2023-11-05',
        endDate: '2024-02-20',
        paymentMethod: 'PayPal',
        goal: 'Provide 7,000 meals for the homeless',
        current: '$5500',
        region: 'Asia',
      },
      {
        id: 6,
        name: 'Project food donation',
        status: 'pending',
        description: 'Description for Project food donation',
        managerName: 'Jane Doe',
        managerEmail: 'jane@example.com',
        createdAt: '2023-11-05',
        endDate: '2024-02-20',
        paymentMethod: 'PayPal',
        goal: 'Provide $100,000 meals for the homeless',
        current: '$95,000',
        region: 'Asia',
      },
    // Other projects...
  ];
  
  // Initial Highlighted Projects
  export const loadHighlightedProjects = {
    regional: [],
    global: [],
  };
  
  // Update Project Function
  export const updateProject = (projects, updatedProject) =>
    projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
  
  // Update Project Status Function
  export const updateProjectStatus = (projects, id, status, reason = '') =>
    projects.map((project) =>
      project.id === id
        ? { ...project, status, haltReason: status === 'halted' ? reason : undefined }
        : project
    );
  
  // Toggle Highlight Function
  export const toggleHighlight = (highlightedProjects, id, type) => {
    const currentType = highlightedProjects[type] || []; // Default to an empty array
    const isHighlighted = currentType.includes(id);
  
    if (isHighlighted) {
      return {
        ...highlightedProjects,
        [type]: currentType.filter((projId) => projId !== id),
      };
    }
  
    if (currentType.length >= 3) {
      alert(`You can only highlight up to 3 ${type} projects.`);
      return highlightedProjects;
    }
  
    return {
      ...highlightedProjects,
      [type]: [...currentType, id],
    };
  };
  
  