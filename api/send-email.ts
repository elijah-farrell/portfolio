import type { IncomingMessage, ServerResponse } from 'http';

interface EmailData {
  from_name: string;
  from_email: string;
  phone: string;
  description: string;
  timeline: string;
  budget: string;
  consultation: string;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    // Read request body
    let body = '';
    for await (const chunk of req) {
      body += chunk.toString();
    }
    const emailData: EmailData = JSON.parse(body);

    // Validate required fields
    if (!emailData.from_name || !emailData.from_email || !emailData.description) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Missing required fields' }));
    }

    // Get EmailJS configuration from environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY; // Use PRIVATE key (server-side only!)

    if (!serviceId || !templateId || !privateKey) {
      console.error('EmailJS configuration missing:', {
        serviceId: serviceId ? 'SET' : 'MISSING',
        templateId: templateId ? 'SET' : 'MISSING',
        privateKey: privateKey ? 'SET' : 'MISSING',
        allEnvVars: Object.keys(process.env).filter(key => key.includes('EMAILJS')),
      });
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ 
        error: 'Email service not configured',
        details: 'Check Vercel environment variables: EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PRIVATE_KEY'
      }));
    }

    // Send email using EmailJS REST API (server-side, secure)
    const response = await fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: privateKey, // Private key used server-side
        template_params: emailData,
      }),
    });

    const result = await response.json();

    if (response.ok && result.status === 200) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ 
        success: true,
        message: 'Email sent successfully' 
      }));
    } else {
      console.error('EmailJS API error:', result);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ 
        error: 'Failed to send email',
        details: result.text || 'Unknown error'
      }));
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }));
  }
}

