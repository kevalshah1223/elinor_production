import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, phone, message, eventType } = await request.json();

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: 'Name and message are required' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
      },
    });

    // Email content
    const emailContent = `
New Contact Form Submission from Elinor Production Website

Name: ${name}
Phone: ${phone || 'Not provided'}
Event Type: ${eventType || 'Not specified'}

Message:
${message}

---
This email was sent from the Elinor Production contact form.
Sent at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `.trim();

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'elinorproduction@gmail.com',
      subject: `🎬 New Inquiry from ${name} - Elinor Production`,
      text: emailContent,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8f9fa; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #000000 0%, #333333 100%); color: #fff; padding: 30px 20px; text-align: center;">
            <div style="display: inline-block; background-color: rgba(255,255,255,0.1); padding: 12px; border-radius: 50%; margin-bottom: 15px;">
              <span style="font-size: 24px;">📸</span>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Elinor Production</h1>
            <p style="margin: 8px 0 0 0; color: #e0e0e0; font-size: 16px;">New Client Inquiry</p>
          </div>

          <div style="background-color: #ffffff; padding: 40px 30px;">
            <div style="background: linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #000;">
              <h2 style="color: #212529; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">📋 Client Information</h2>
              <p style="color: #6c757d; margin: 0; font-size: 14px;">New inquiry received from your website</p>
            </div>

            <div style="display: grid; gap: 20px; margin-bottom: 30px;">
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                  <span style="margin-right: 8px;">👤</span>
                  <strong style="color: #495057; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Client Name</strong>
                </div>
                <p style="margin: 0; color: #212529; font-size: 18px; font-weight: 600;">${name}</p>
              </div>

              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                  <span style="margin-right: 8px;">📞</span>
                  <strong style="color: #495057; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</strong>
                </div>
                <p style="margin: 0; color: #212529; font-size: 18px; font-weight: 600;">${phone || 'Not provided'}</p>
              </div>

              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                  <span style="margin-right: 8px;">🎬</span>
                  <strong style="color: #495057; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Event Type</strong>
                </div>
                <p style="margin: 0; color: #212529; font-size: 18px; font-weight: 600;">${eventType || 'Not specified'}</p>
              </div>
            </div>

            <div style="margin-bottom: 30px;">
              <div style="background: linear-gradient(90deg, #e3f2fd 0%, #f3e5f5 100%); padding: 20px; border-radius: 8px; border: 1px solid #e1bee7;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <span style="margin-right: 8px;">💬</span>
                  <strong style="color: #4a148c; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Client Message</strong>
                </div>
                <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; border: 1px solid #e0e0e0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <p style="margin: 0; color: #212529; line-height: 1.7; font-size: 16px; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            </div>

            <div style="background: linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; text-align: center;">
              <div style="margin-bottom: 15px;">
                <span style="background-color: #28a745; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  ✅ New Inquiry
                </span>
              </div>
              <p style="color: #6c757d; font-size: 14px; margin: 0; line-height: 1.5;">
                <strong>📧 Source:</strong> Elinor Production Website Contact Form<br>
                <strong>🕒 Received:</strong> ${new Date().toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}<br>
                <strong>🌍 Timezone:</strong> India Standard Time (IST)
              </p>
            </div>

            <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e9ecef; margin-top: 20px;">
              <p style="color: #6c757d; font-size: 12px; margin: 0;">
                This email was automatically generated by the Elinor Production website.<br>
                Please respond to this inquiry as soon as possible.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('📧 Contact form email sent successfully to elinorproduction@gmail.com');

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });

  } catch (error) {
    console.error('❌ Error sending contact form email:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
