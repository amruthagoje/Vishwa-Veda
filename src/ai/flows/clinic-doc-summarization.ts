'use server';

/**
 * @fileOverview A Genkit flow for summarizing clinic certification documents.
 *
 * - summarizeClinicDocument - A function that handles the summarization process.
 * - ClinicDocSummarizationInput - The input type for the summarizeClinicDocument function.
 * - ClinicDocSummarizationOutput - The return type for the summarizeClinicDocument function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ClinicDocSummarizationInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The text content of the clinic certification document to be summarized.'),
});
export type ClinicDocSummarizationInput = z.infer<typeof ClinicDocSummarizationInputSchema>;

const ClinicDocSummarizationOutputSchema = z.object({
  clinicName: z.string().describe('The name of the clinic as identified in the document.'),
  certificationType: z.string().describe('The type of certification (e.g., Ayurvedic Council Registration, ISO 9001).'),
  issueDate: z.string().optional().describe('The date the certification was issued, if available. Format as YYYY-MM-DD.'),
  expiryDate: z.string().optional().describe('The date the certification expires, if available. Format as YYYY-MM-DD.'),
  certifiedBy: z.string().optional().describe('The issuing authority or body that certified the clinic.'),
  keySummary: z.string().describe('A concise summary of the key information and validity of the certification.'),
});
export type ClinicDocSummarizationOutput = z.infer<typeof ClinicDocSummarizationOutputSchema>;

export async function summarizeClinicDocument(input: ClinicDocSummarizationInput): Promise<ClinicDocSummarizationOutput> {
  return clinicDocSummarizationFlow(input);
}

const clinicDocSummarizationPrompt = ai.definePrompt({
  name: 'clinicDocSummarizationPrompt',
  input: { schema: ClinicDocSummarizationInputSchema },
  output: { schema: ClinicDocSummarizationOutputSchema },
  prompt: `You are an AI assistant tasked with summarizing clinic certification documents for administrative review.
Your goal is to extract key information and provide a concise summary of the document's content and the validity of the certification.

Extract the following details:
- Clinic Name: The official name of the clinic.
- Certification Type: The type of certification provided (e.g., 'Ayurvedic Council Registration', 'NABH Accreditation').
- Issue Date: The date when the certification was issued.
- Expiry Date: The date when the certification will expire.
- Certified By: The name of the organization or authority that issued the certification.
- Key Summary: A brief summary of the document's content, confirming its validity and any other important notes.

If any information is not explicitly found, leave it blank or state 'Not found'.
Dates should be in 'YYYY-MM-DD' format if possible.

Document Content:
{{{documentContent}}}`
});

const clinicDocSummarizationFlow = ai.defineFlow(
  {
    name: 'clinicDocSummarizationFlow',
    inputSchema: ClinicDocSummarizationInputSchema,
    outputSchema: ClinicDocSummarizationOutputSchema,
  },
  async (input) => {
    const { output } = await clinicDocSummarizationPrompt(input);
    return output!;
  }
);
