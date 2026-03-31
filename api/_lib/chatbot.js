import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { NodeHttpHandler } from '@aws-sdk/node-http-handler';
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

function getBedrockClient() {
  return new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    requestHandler: new NodeHttpHandler({
      httpsAgent: new https.Agent({ keepAlive: false }),
    }),
  });
}

export async function getChatResponse(sessionId, userMessage, conversationHistory = []) {
  try {
    const client = getBedrockClient();

    // Build messages list
    const messages = [];
    if (conversationHistory && conversationHistory.length > 0) {
      for (const msg of conversationHistory) {
        messages.push({
          role: msg.role || 'user',
          content: msg.content || '',
        });
      }
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage,
    });

    // Call Claude Sonnet 4.5 via Bedrock
    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-sonnet-4-5-20250929-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-06-01',
        max_tokens: 1024,
        system: SYSTEM_MESSAGE,
        messages: messages,
      }),
    });

    const response = await client.send(command);

    // Parse response
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const chatResponse = responseBody.content?.[0]?.text || '';

    return chatResponse;
  } catch (error) {
    console.error('Error in chatbot:', error.message);
    return "Yo, my bad - something's acting up. Hit me up on our socials or try again in a sec!";
  }
}

export { SYSTEM_MESSAGE };
