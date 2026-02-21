'use server';
/**
 * @fileOverview An AI chat assistant for Panchakarma queries and personalized therapy suggestions.
 *
 * - aiChatAssistantPanchakarma - A function that handles the AI chat assistant process for Panchakarma.
 * - AiChatAssistantPanchakarmaInput - The input type for the aiChatAssistantPanchakarma function.
 * - AiChatAssistantPanchakarmaOutput - The return type for the aiChatAssistantPanchakarma function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiChatAssistantPanchakarmaInputSchema = z.object({
  userQuery: z.string().describe('The user\'s question or description of symptoms related to Panchakarma or therapy suggestions.'),
});
export type AiChatAssistantPanchakarmaInput = z.infer<typeof AiChatAssistantPanchakarmaInputSchema>;

const AiChatAssistantPanchakarmaOutputSchema = z.object({
  response: z.string().describe('A detailed response answering the user\'s question or providing personalized therapy suggestions.'),
});
export type AiChatAssistantPanchakarmaOutput = z.infer<typeof AiChatAssistantPanchakarmaOutputSchema>;

export async function aiChatAssistantPanchakarma(input: AiChatAssistantPanchakarmaInput): Promise<AiChatAssistantPanchakarmaOutput> {
  return aiChatAssistantPanchakarmaFlow(input);
}

const panchakarmaPrompt = ai.definePrompt({
  name: 'panchakarmaAssistantPrompt',
  input: {schema: AiChatAssistantPanchakarmaInputSchema},
  output: {schema: AiChatAssistantPanchakarmaOutputSchema},
  prompt: `You are an AI chat assistant named Vishwa Veda, specializing in Ayurveda and Panchakarma. Your role is to provide informative answers to user questions about Panchakarma and offer personalized therapy suggestions based on the symptoms they describe.

When answering questions about Panchakarma, provide clear, concise, and accurate information grounded in Ayurvedic principles.
When suggesting therapies, analyze the symptoms provided by the user and suggest relevant Panchakarma therapies or general Ayurvedic recommendations. Emphasize that these are suggestions and a consultation with a qualified Ayurvedic practitioner is essential for a proper diagnosis and treatment plan.

Maintain a compassionate, knowledgeable, and professional tone, reflecting a personalized healthcare tool.

User's query/symptoms: {{{userQuery}}}

Based on the above, provide a comprehensive response in the requested JSON format.`,
});

const aiChatAssistantPanchakarmaFlow = ai.defineFlow(
  {
    name: 'aiChatAssistantPanchakarmaFlow',
    inputSchema: AiChatAssistantPanchakarmaInputSchema,
    outputSchema: AiChatAssistantPanchakarmaOutputSchema,
  },
  async (input) => {
    const {output} = await panchakarmaPrompt(input);
    return output!;
  }
);
