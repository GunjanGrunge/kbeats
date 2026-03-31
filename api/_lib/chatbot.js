import https from 'https';

const SYSTEM_MESSAGE = `You're chatting for K Beats - a music production crew that creates fire tracks for everything from YouTube vlogs to weddings.

Talk like a real person who's passionate about music. No corporate speak, no "How may I assist you today?" vibes. Just be genuine, excited, and helpful. Use casual language, contractions, and show personality.

What K Beats does:
- Custom beats and production for content creators
- Wedding/event soundtracks that hit different
- Mix & master for independent artists
- Trending remixes that slap

Your job:
- Have a real conversation about their music needs
- Get hyped about their project
- Ask natural questions: What's the vibe? What's it for? Any reference tracks they're feeling?
- Casually get their contact info (name, email, maybe phone) so the team can follow up
- No pricing talk - every project's different, we quote after talking

Keep it short, keep it real. You're texting with someone who needs dope music, not giving a presentation.`;

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

export async function getChatResponse(sessionId, userMessage, conversationHistory = []) {
  try {
    const region = process.env.AWS_REGION || 'us-east-1';
    const modelId = 'us.anthropic.claude-sonnet-4-5-20250929-v1:0';

    const messages = [];
    if (conversationHistory && conversationHistory.length > 0) {
      for (const msg of conversationHistory) {
        messages.push({ role: msg.role || 'user', content: msg.content || '' });
      }
    }
    messages.push({ role: 'user', content: userMessage });

    const bodyPayload = JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      system: SYSTEM_MESSAGE,
      messages,
    });

    const response = await httpsRequest(
      {
        hostname: `bedrock-runtime.${region}.amazonaws.com`,
        path: `/model/${encodeURIComponent(modelId)}/invoke`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AWS_BEARER_TOKEN_BEDROCK}`,
        },
      },
      bodyPayload
    );

    if (response.statusCode !== 200) {
      console.error('Bedrock error:', response.statusCode, response.body);
      throw new Error(`Bedrock returned ${response.statusCode}: ${response.body}`);
    }

    const parsed = JSON.parse(response.body);
    return parsed.content?.[0]?.text || '';
  } catch (error) {
    console.error('Error in chatbot:', error.message);
    return "Yo, my bad - something's acting up. Hit me up on our socials or try again in a sec!";
  }
}

export { SYSTEM_MESSAGE };
