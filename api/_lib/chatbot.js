import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';

const MODEL_ARN = 'arn:aws:bedrock:us-east-1:751289209169:inference-profile/global.anthropic.claude-sonnet-4-5-20250929-v1:0';

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
    bedrockClient = new BedrockRuntimeClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  return bedrockClient;
}

export async function getChatResponse(sessionId, userMessage, conversationHistory = []) {
  try {
    const client = getClient();

    // Build Converse API messages (content must be array of blocks)
    const messages = [];
    if (conversationHistory && conversationHistory.length > 0) {
      for (const msg of conversationHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role,
            content: [{ text: msg.content || '' }],
          });
        }
      }
    }
    messages.push({ role: 'user', content: [{ text: userMessage }] });

    const command = new ConverseCommand({
      modelId: MODEL_ARN,
      system: [{ text: SYSTEM_MESSAGE }],
      messages,
      inferenceConfig: { maxTokens: 1024 },
    });

    const response = await client.send(command);
    return response.output?.message?.content?.[0]?.text || '';
  } catch (error) {
    console.error('Error in chatbot:', error.message);
    return "Yo, my bad - something's acting up. Hit me up on our socials or try again in a sec!";
  }
}

export { SYSTEM_MESSAGE };
