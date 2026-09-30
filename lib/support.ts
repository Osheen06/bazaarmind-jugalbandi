export interface SupportOpportunity {
  id: string;
  name: string;
  description: string;
  cta: string;
  url: string;
}

export const supportOpportunities: SupportOpportunity[] = [
  {
    id: "pmfby",
    name: "PMFBY Crop Insurance",
    description: "You may be eligible for crop insurance support.",
    cta: "Check official eligibility",
    url: "https://pmfby.gov.in",
  },
  {
    id: "kcc",
    name: "KCC Agricultural Credit",
    description: "You may be eligible for the Kisan Credit Card scheme.",
    cta: "Check official eligibility",
    url: "https://www.nabard.org/content.aspx?id=572",
  },
];
