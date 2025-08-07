import { Resend } from 'resend';

// Initialize Resend with the API key from your .env file
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
  try {
    const { recipients, subject, body } = req.body;
    if (!recipients || !subject || !body) {
      return res.status(400).json({ error: "Recipients, subject, and body are required" });
    }

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // IMPORTANT: Replace with your verified domain for production
      to: recipients.split(','), // Resend expects an array of emails
      subject: subject,
      html: `<p>${body.replace(/\n/g, '<br>')}</p>` // Use HTML for the body
    });

    // Check if Resend returned an error
    if (error) {
      console.error("Resend API Error:", error);
      return res.status(400).json({ error });
    }

    // Success
    res.json({ message: "Email sent successfully", data });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};