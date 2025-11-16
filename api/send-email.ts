import type { VercelRequest, VercelResponse } from '@vercel/node';

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
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vercel automatically parses JSON body, but handle both cases
    let emailData: EmailData;
    
    if (req.body && typeof req.body === 'object') {
      emailData = req.body as EmailData;
    } else {
      // Fallback: parse if it's a string
      emailData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    }

    // Validate required fields
    if (!emailData || !emailData.from_name || !emailData.from_email || !emailData.description) {
      return res.status(400).json({ error: 'Missing required fields' });
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
      return res.status(500).json({ 
        error: 'Email service not configured',
        details: 'Check Vercel environment variables: EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PRIVATE_KEY'
      });
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
      return res.status(200).json({ 
        success: true,
        message: 'Email sent successfully' 
      });
    } else {
      console.error('EmailJS API error:', result);
      return res.status(500).json({ 
        error: 'Failed to send email',
        details: result.text || result.error || 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

