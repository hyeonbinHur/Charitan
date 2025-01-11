import { axiosInstance } from "./axiosUtils";
const getProjects = async (status, category) => {
  try {
    const response = await axiosInstance.get(
      `project/search/status?status=${status}&category=${category}`
    );
    return response.data;
  } catch (err) {
    console.log("Error fetching projects:", err);
    throw err;
  }
};

const getProjectsByStatus = async (status) => {
  try {
    const response = await axiosInstance.get(
      `project/only/status?status=${status}`
    );
    return response.data;
  } catch (err) {
    console.error("Error while read projects by status ", err);
    throw err;
  }
};

const getProject = async (id) => {
  try {
    const response = await axiosInstance.get(`project/${id}`);
    return response.data[0];
  } catch (err) {
    console.log("Error get one project", err);
    throw err;
  }
};

const getHaltedProject = async () => {
  try {
    console.log("here");
    const response = await axiosInstance.get(`project/admin/halted`);
    return response.data;
  } catch (err) {
    console.log("Error get one project", err);
    throw err;
  }
};
const createProject = async (newProject) => {
  try {
    const response = await axiosInstance.post("project", newProject);
    return response.data;
  } catch (err) {
    console.log("error while creating new project", err);
    throw err;
  }
};
const updateProject = async (newPost, id) => {
  try {
    const response = await axiosInstance.put(`project/${id}`, newPost);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("error while updating project", err);
    throw err;
  }
};

const deleteProject = async (id) => {
  try {
    const response = await axiosInstance.delete(`project/${id}`);
    return response.data;
  } catch (err) {
    console.log("error while deleting project", err);
    throw err;
  }
};

    const getProjectsByCharityName = async (
      charityName,
      status,
      category,
      country
    ) => {
      try {
        const response = await axiosInstance.get(
          `project/search/charity?charityName=${charityName}&status=${status}&category=${category}&country=${country}`
        );
        return response.data;
      } catch (err) {
        console.log("error while read projects by charity name : ", err);
        throw err;
      }
    };

    const getProjectsByProjectTitle = async (
      projectName,
      status,
      category,
      country
    ) => {
      try {
        const response = await axiosInstance.get(
          `project/search/project?projectName=${projectName}&status=${status}&category=${category}&country=${country}`
        );

        return response.data;
      } catch (err) {
        console.log("error while read projects by project name : ", err);
        throw err;
      }
    };
    const getProjectsByCountry = async (country, status, category) => {
      try {
        const response = await axiosInstance.get(
          `project/search/project?county=${country}&status=${status}&category=${category}`
        );
        return response.data;
      } catch (err) {
        console.log("error while read projects by project name : ", err);
        throw err;
      }
    };
    // Function to subscribe to a project
    const subscribeToNewProjects = async ({ donor_id, category, region, donation_id }) => {
      try {
        const response = await axiosInstance.post("/subscribe/donor", {
          donor_id,
          category,
          region,
          donation_id,
        });
        return response.data;  // Return subscription response
      } catch (err) {
        console.error("Error subscribing to new projects:", err);
        throw err;  // Handle error in frontend
      }
    };

    // Function to get subscriptions for a donor
    const getDonorSubscriptions = async (donor_id) => {
      try {
        // Make a GET request to fetch the subscriptions for the specific donor
        const response = await axiosInstance.get(`/subscriptions/${donor_id}`);
        return response.data; // Return the response data containing subscriptions
      } catch (err) {
        console.error("Error fetching donor subscriptions:", err);
        throw err;
      }
    };

    // Function to process monthly donations
    const processMonthlyDonation = async (donorData) => {
      try {
        const response = await axiosInstance.post("/monthly-donation/donor", donorData); // Correct endpoint
        return response.data;
      } catch (err) {
        console.log("Error processing monthly donation:", err);
        throw err;
      }
    };

    // Function to cancel monthly donations
    const cancelMonthlyDonation = async (donorData) => {
      try {
        const response = await axiosInstance.post("/cancel-monthly-donation/donor", donorData); // Correct endpoint
        return response.data;
      } catch (err) {
        console.log("Error canceling monthly donation:", err);
        throw err;
      }
    };

    const getSubscribedProjects = async (donor_id) => {
      try {
        const response = await axiosInstance.get(`/subscriptions`); // Use axiosInstance
        return response.data;  // Return the data containing the subscribed projects
      } catch (error) {
        console.error("Error fetching subscribed projects", error);
        throw error;  // Throw the error to be handled in the component
      }
    };

    const getTopDonors = async () => {
      try {
        const response = await axiosInstance.get(`/top-donors/donor`);  // Ensure the correct backend endpoint
        return response.data;  // Return the response containing the top donors
      } catch (err) {
        console.error("Error fetching top donors:", err);
        throw err;  // Handle error in frontend
      }
    };

    const updateProjectToComplete = async (id) => {
      try {
        const response = await axiosInstance.patch(
          `project/status/completed/${id}`
        );
        return response.data;
      } catch (err) {
        console.log("Error while update project status to halt");
        throw err;
      }
    };

    const updateProjectDonation = async (id, donationStatus) => {
      try {
        console.log("why not");
        const response = await axiosInstance.patch(
          `project/donate/donor/${id}`,
          donationStatus
        );
        return response.data;
      } catch (err) {
        console.log("Error while update project status to halt", err);
        throw err;
      }
    };

    export {
      getProjects,
      getProject,
      createProject,
      updateProject,
      deleteProject,
      getProjectsByCharityName,
      getProjectsByProjectTitle,
      getProjectsByCountry,
      subscribeToNewProjects,
      getDonorSubscriptions,
      processMonthlyDonation,
      getTopDonors,
      cancelMonthlyDonation,
      getSubscribedProjects,
      updateProjectToComplete,
      getProjectsByStatus,
      updateProjectDonation,
    };

