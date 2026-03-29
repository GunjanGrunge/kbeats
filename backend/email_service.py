from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
import os
from dotenv import load_dotenv

load_dotenv()

class EmailService:
    def __init__(self):
        self.api_key = os.getenv('SENDGRID_API_KEY')
        self.kbeats_email = os.getenv('KBEATS_EMAIL', 'artists@kebeatsofficial.com')
    
    async def send_lead_notification(self, lead_data: dict) -> bool:
        """
        Send notification email to K Beats when a new lead comes through the chatbot
        """
        if not self.api_key:
            print("SendGrid API key not configured")
            return False
        
        try:
            # Format conversation history
            conversation_html = ""
            for msg in lead_data.get('conversation_history', []):
                role = msg.get('role', 'unknown')
                content = msg.get('content', '')
                role_color = '#ccff00' if role == 'user' else '#888888'
                role_label = 'Customer' if role == 'user' else 'K Beats AI'
                conversation_html += f"""
                <div style="margin-bottom: 12px; padding: 12px; background: {'#1a1a1c' if role == 'user' else '#0d0d0d'}; border-radius: 8px;">
                    <strong style="color: {role_color};">{role_label}:</strong>
                    <p style="color: #ffffff; margin: 8px 0 0 0;">{content}</p>
                </div>
                """
            
            # Build email content
            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #050505; color: #ffffff; padding: 20px; }}
                    .container {{ max-width: 600px; margin: 0 auto; background: #0d0d0d; border-radius: 12px; padding: 32px; border: 1px solid #222; }}
                    .header {{ text-align: center; margin-bottom: 24px; }}
                    .logo {{ font-size: 32px; font-weight: 900; }}
                    .logo-k {{ color: #ccff00; }}
                    .logo-beats {{ color: #ffffff; letter-spacing: 0.2em; font-weight: 300; }}
                    .section {{ margin-bottom: 24px; }}
                    .section-title {{ color: #ccff00; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }}
                    .info-item {{ padding: 8px 0; border-bottom: 1px solid #222; }}
                    .info-label {{ color: #888; font-size: 12px; text-transform: uppercase; }}
                    .info-value {{ color: #fff; font-size: 16px; margin-top: 4px; }}
                    .conversation {{ background: #050505; padding: 16px; border-radius: 8px; max-height: 400px; overflow-y: auto; }}
                    .cta {{ text-align: center; margin-top: 24px; }}
                    .cta a {{ background: #ccff00; color: #050505; padding: 12px 24px; text-decoration: none; font-weight: 600; border-radius: 4px; }}
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
                            <div class="info-value">{lead_data.get('session_id', 'N/A')}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Initial Request</div>
                            <div class="info-value">{lead_data.get('requirements', 'N/A')}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Name</div>
                            <div class="info-value">{lead_data.get('name', 'Not provided yet')}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Email</div>
                            <div class="info-value">{lead_data.get('email', 'Not provided yet')}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Phone</div>
                            <div class="info-value">{lead_data.get('phone', 'Not provided yet')}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Project Type</div>
                            <div class="info-value">{lead_data.get('project_type', 'Not specified')}</div>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">Conversation History</div>
                        <div class="conversation">
                            {conversation_html if conversation_html else '<p style="color: #888;">No conversation yet</p>'}
                        </div>
                    </div>
                    
                    <div class="cta">
                        <p style="color: #888; font-size: 14px;">Follow up with this lead ASAP!</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            # Create the email message
            message = Mail(
                from_email=Email(self.kbeats_email, "K Beats AI"),
                to_emails=To(self.kbeats_email),
                subject=f"New K Beats Lead: {lead_data.get('requirements', 'New Inquiry')[:50]}...",
                html_content=Content("text/html", html_content)
            )
            
            sg = SendGridAPIClient(self.api_key)
            response = sg.send(message)
            
            print(f"[EMAIL] Lead notification sent successfully. Status: {response.status_code}")
            return response.status_code == 202
            
        except Exception as e:
            print(f"[EMAIL ERROR] Failed to send lead notification: {str(e)}")
            # Log the full error for debugging
            import traceback
            traceback.print_exc()
            return False


# Singleton instance
email_service = EmailService()
