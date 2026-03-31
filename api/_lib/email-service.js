import sgMail from '@sendgrid/mail';
import { ensureEnvLoaded } from './load-env.js';

ensureEnvLoaded();


class EmailService {
  constructor() {
    this.kbeatsEmail = process.env.KBEATS_EMAIL || 'artists@kebeatsofficial.com';

    const apiKey = process.env.SENDGRID_API_KEY;
    this.isConfigured = Boolean(apiKey && apiKey.startsWith('SG.'));

    if (this.isConfigured) {
      sgMail.setApiKey(apiKey);
    } else {
      console.log('SendGrid disabled: missing or invalid SENDGRID_API_KEY');
    }
  }

  async sendLeadNotification(leadData) {
    if (!this.isConfigured) {
      return false;
    }

    try {
      // Format conversation history
      let conversationHtml = '';
      const conversationHistory = leadData.conversation_history || [];

      for (const msg of conversationHistory) {
        const role = msg.role || 'unknown';
        const content = msg.content || '';
        const roleColor = role === 'user' ? '#ccff00' : '#888888';
        const roleLabel = role === 'user' ? 'Customer' : 'K Beats AI';
        const bgColor = role === 'user' ? '#1a1a1c' : '#0d0d0d';

        conversationHtml += `
          <div style="margin-bottom: 12px; padding: 12px; background: ${bgColor}; border-radius: 8px;">
            <strong style="color: ${roleColor};">${roleLabel}:</strong>
            <p style="color: #ffffff; margin: 8px 0 0 0;">${content}</p>
          </div>
        `;
      }

      // Build email content
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #050505; color: #ffffff; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #0d0d0d; border-radius: 12px; padding: 32px; border: 1px solid #222; }
            .header { text-align: center; margin-bottom: 24px; }
            .logo { font-size: 32px; font-weight: 900; }
            .logo-k { color: #ccff00; }
            .logo-beats { color: #ffffff; letter-spacing: 0.2em; font-weight: 300; }
            .section { margin-bottom: 24px; }
            .section-title { color: #ccff00; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
            .info-item { padding: 8px 0; border-bottom: 1px solid #222; }
            .info-label { color: #888; font-size: 12px; text-transform: uppercase; }
            .info-value { color: #fff; font-size: 16px; margin-top: 4px; }
            .conversation { background: #050505; padding: 16px; border-radius: 8px; max-height: 400px; overflow-y: auto; }
            .cta { text-align: center; margin-top: 24px; }
            .cta a { background: #ccff00; color: #050505; padding: 12px 24px; text-decoration: none; font-weight: 600; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <span class="logo-k">K</span><span class="logo-beats">BEATS</span>
              </div>
              <p style="color: #ccff00; margin-top: 8px;">New Lead Alert!</p>
            </div>

            <div class="section">
              <div class="section-title">Lead Information</div>
              <div class="info-item">
                <div class="info-label">Session ID</div>
                <div class="info-value">${leadData.session_id || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Initial Request</div>
                <div class="info-value">${leadData.requirements || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Name</div>
                <div class="info-value">${leadData.name || 'Not provided yet'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${leadData.email || 'Not provided yet'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Phone</div>
                <div class="info-value">${leadData.phone || 'Not provided yet'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Project Type</div>
                <div class="info-value">${leadData.project_type || 'Not specified'}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Conversation History</div>
              <div class="conversation">
                ${conversationHtml || '<p style="color: #888;">No conversation yet</p>'}
              </div>
            </div>

            <div class="cta">
              <a href="mailto:${leadData.email || this.kbeatsEmail}">Follow Up</a>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send email
      const msg = {
        to: this.kbeatsEmail,
        from: this.kbeatsEmail,
        subject: `🎵 New Lead: ${leadData.name || 'New Inquiry'} | K Beats`,
        html: htmlContent,
      };

      await sgMail.send(msg);
      console.log(`Lead email sent for session: ${leadData.session_id}`);
      return true;
    } catch (error) {
      console.error('Error sending lead email:', error.message);
      return false;
    }
  }
}

export const emailService = new EmailService();
