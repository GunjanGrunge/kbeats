import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { ensureEnvLoaded } from './load-env.js';

ensureEnvLoaded();


const MODEL_ID = process.env.BEDROCK_MODEL_ID || 'us.anthropic.claude-sonnet-4-5-20250929-v1:0';

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

let bedrockClient = null;

function getClient() {
  if (!bedrockClient) {
    const region = process.env.AWS_REGION || 'us-east-1';
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const sessionToken = process.env.AWS_SESSION_TOKEN;

    const hasStaticCredentials = Boolean(accessKeyId && secretAccessKey);

    bedrockClient = new BedrockRuntimeClient({
      region,
      ...(hasStaticCredentials
        ? {
            credentials: {
              accessKeyId,
              secretAccessKey,
              ...(sessionToken ? { sessionToken } : {}),
            },
          }
        : {}),
    });
  }

  return bedrockClient;
}

export async function getChatResponse(sessionId, userMessage, conversationHistory = []) {
  try {
    const client = getClient();

    const messages = [];
    if (conversationHistory && conversationHistory.length > 0) {
      for (const msg of conversationHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: [{ type: 'text', text: msg.content || '' }] });
        }
      }
    }
    messages.push({ role: 'user', content: [{ type: 'text', text: userMessage }] });

    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      system: SYSTEM_MESSAGE,
      messages,
    };

    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: new TextEncoder().encode(JSON.stringify(payload)),
    });

    const response = await client.send(command);
    const parsed = JSON.parse(new TextDecoder().decode(response.body));

    return parsed.content?.[0]?.text || '';
  } catch (error) {
    console.error('Error in chatbot Bedrock call:', {
      message: error?.message,
      name: error?.name,
      modelId: MODEL_ID,
      region: process.env.AWS_REGION || 'us-east-1',
      requestId: error?.$metadata?.requestId,
      httpStatusCode: error?.$metadata?.httpStatusCode,
      sessionId,
    });

    return "Yo, my bad - something's acting up. Hit me up on our socials or try again in a sec!";
  }
}

export { SYSTEM_MESSAGE, MODEL_ID };
