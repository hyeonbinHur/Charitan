    // donor_service.js
    import donorRepository from "../repository/donor_repository.js";   // For donor operations
    import donationRepository from "../repository/donation_repository.js"; // For donation records
    import subscriptionRepository from "../repository/subscription_repository.js"; // For subscription management

    import nodemailer from "nodemailer";  // For sending email notifications

    // Email setup
    // Email sending logic
    const send_email = async (receiverEmail, subject, message) => {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER, // Gmail account
            pass: process.env.EMAIL_PASS, // App password
          },
        });

        const mailOptions = {
          to: receiverEmail, // Receiver's email
          subject: subject,
          text: message,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
      } catch (err) {
        console.error("Failed to send email:", err);
      }
    };

    /**
     * sample auth api
     */
    const signInUser = async (email) => {
      try {
        console.log("here");
        const user = await donorRepository.findOneByEmail(email);
        // await setUser(user[0].user_id, user[0].user_name);
        return user;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to read data");
      }
    };

    // Subscribe a donor to a new project
    const subscribeToNewProjects = async (donor_id, category, region, donation_id) => {
      try {
        // Ensure the donation exists for the donor
        const [donations] = await donationRepository.getDonationsByDonor(donor_id);

        if (!donations || donations.length === 0) {
          throw new Error("No donation found for this donor.");
        }

        // Create subscription if valid donation exists
        const subscription = {
          donor_id,
          category,
          region,
          created_at: new Date(),
          donation_id,  // Use the donation_id from the Donation table
        };

        // Save subscription
        const result = await subscriptionRepository.createSubscription(subscription);

        // Send email notification to donor
        const donor = await donorRepository.findDonorById(donor_id);
        const subject = 'New Project Subscription Notification';
        const message = `Hello ${donor.name},\n\nYou have successfully subscribed to receive notifications for new projects in the ${region} region and ${category} category. You will be notified when a new project matching your preferences is published.\n\nThank you for your support!`;

        // Call send_email function
        await send_email(donor.email, subject, message);

        return result;
      } catch (err) {
        console.error(err);
        throw new Error("Error subscribing to project: " + err.message);
      }
    };

    // Process monthly donations for all donors who have opted in
    const processMonthlyDonations = async () => {
      try {
        console.log("Starting monthly donation processing...");

        // Calculate the time remaining until the next 15th of the month
        const timeUntilNext15th = getTimeToNext15th();
        console.log(`Time until next 15th: ${timeUntilNext15th} milliseconds`);


        // Use setTimeout to execute the donation processing function on the 15th
        setTimeout(async () => {
          try {
            console.log("Processing monthly donations...");

            // Fetch all donors who have made donations in the current month
            const [monthlyDonors] = await donationRepository.getTopDonorsByMonth();
            console.log("Donors to process:", monthlyDonors);

            // Process donations for each donor
            for (const donor of monthlyDonors) {
              const donationAmount = donor.total_amount;
              console.log(`Processing donation for donor ${donor.donor_id} - Amount: ${donationAmount}`);
              await donationRepository.createDonation({
                donor_id: donor.donor_id,
                amount: donationAmount,
                email_id: donor.email_id,
                donation_date: new Date(),
              });
            }

            console.log("Monthly donations processed successfully.");

            // Re-run the function for the next month
            processMonthlyDonations();  // Schedule next month's donation processing

          } catch (err) {
            console.error("Error processing monthly donations:", err.message);
          }
        }, timeUntilNext15th);  // Set timeout to run at the calculated time

      } catch (err) {
        throw new Error("Failed to process monthly donations: " + err.message);
      }
    };


    // Cancel monthly donation
    const cancelMonthlyDonation = async (donor_id) => {
      try {
        // Find if the donor has an active monthly donation subscription
        const subscription = await subscriptionRepository.findSubscriptionByDonor(donor_id);

        if (!subscription) {
          throw new Error("No active subscription found for this donor.");
        }

        // Remove the subscription from the database
        await subscriptionRepository.cancelSubscription(donor_id);

        return { message: 'Monthly donation subscription cancelled successfully.' };
      } catch (err) {
        throw new Error("Failed to cancel monthly donation: " + err.message);
      }
    };

    // Utility function to calculate the time remaining until the next 15th of the month
    const getTimeToNext15th = () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const next15th = new Date(now.getFullYear(), currentMonth, 15);

      // If today is after the 15th, calculate for the next month
      if (now.getDate() > 15) {
        next15th.setMonth(currentMonth + 1);
      }

      return next15th.getTime() - now.getTime();  // Return the time difference in milliseconds
    };

    // Get top donors of the current month
    const getTopDonors = async () => {
      try {
        const [topDonors] = await donationRepository.getTopDonorsByMonth();
        return topDonors;
      } catch (err) {
        throw new Error("Failed to fetch top donors: " + err.message);
      }
    };

    const getSubscriptionsByDonor = async (subscription_id) => {
      try {
        // Assuming you have a method in your repository to fetch subscriptions by donor_id
        const subscriptions = await subscriptionRepository.findSubscriptionByDonor(subscription_id);
        return subscriptions;
      } catch (err) {
        throw new Error("Failed to fetch subscriptions: " + err.message);
      }
    };
    const getAllSubscriptions = async () => {
      try {
        const subscriptions = await subscriptionRepository.getAllSubscriptions();
        return subscriptions;  // This will return an array of subscriptions
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        throw new Error("Error fetching subscriptions");
      }
    };

    export default { signInUser, subscribeToNewProjects, cancelMonthlyDonation, processMonthlyDonations, getTopDonors, getSubscriptionsByDonor, getAllSubscriptions };
