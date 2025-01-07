import nodemailer from "nodemailer";

const send_email = async (req, res) => {
  // set cache
  try {
    const { receiverEmail, subject, message } = req.body;
    if (!receiverEmail || !subject || !message) {
      return res.status(400).send("All fields are required!");
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Gmail 계정
        pass: process.env.EMAIL_PASS, // 앱 비밀번호
      },
    });
    const mailOptions = {
      to: receiverEmail, // 동적 설정 (받는 사람)
      subject: subject,
      text: message,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (err) {
    console.error("Failed to send email:", err);
    res.status(500).send("Failed to send email. Please try again later.");
  }
};
export default {
  send_email,
};
