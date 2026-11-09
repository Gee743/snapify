/**
 * Validation for the public lead/submission forms.
 *
 * These endpoints are unauthenticated, so everything is length-capped and
 * shape-checked before it reaches the database, and the email check is
 * deliberately simple -- the goal is rejecting obvious junk, not RFC compliance.
 */
const MAX = {
   name: 120,
   email: 254,
   phone: 40,
   shortText: 200,
   message: 2000,
} as const;

const text = (value: unknown, max: number): string | null => {
   if (typeof value !== "string") return null;
   const trimmed = value.trim();
   if (!trimmed || trimmed.length > max) return null;
   return trimmed;
};

const optionalText = (value: unknown, max: number): string | null | undefined => {
   if (value === undefined || value === null || value === "") return undefined;
   return text(value, max);
};

export const isEmail = (value: string) =>
   /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= MAX.email;

export interface OwnerLeadInput {
   name: string;
   email: string;
   phone?: string;
   spaceName?: string;
   locationText?: string;
   spaceType?: string;
   message?: string;
}

export const parseOwnerLead = (body: unknown): OwnerLeadInput | null => {
   if (!body || typeof body !== "object") return null;
   const value = body as Record<string, unknown>;

   const name = text(value.name, MAX.name);
   const email = text(value.email, MAX.email);
   if (!name || !email || !isEmail(email)) return null;

   const phone = optionalText(value.phone, MAX.phone);
   const spaceName = optionalText(value.spaceName, MAX.shortText);
   const locationText = optionalText(value.locationText, MAX.shortText);
   const spaceType = optionalText(value.spaceType, MAX.shortText);
   const message = optionalText(value.message, MAX.message);

   if ([phone, spaceName, locationText, spaceType, message].includes(null)) return null;

   return {
      name,
      email,
      ...(phone && { phone }),
      ...(spaceName && { spaceName }),
      ...(locationText && { locationText }),
      ...(spaceType && { spaceType }),
      ...(message && { message }),
   };
};

export const parseNewsletterEmail = (body: unknown): { email: string; source?: string } | null => {
   if (!body || typeof body !== "object") return null;
   const value = body as Record<string, unknown>;
   const email = text(value.email, MAX.email);
   if (!email || !isEmail(email)) return null;
   const source = optionalText(value.source, MAX.shortText);
   if (source === null) return null;
   return { email: email.toLowerCase(), ...(source && { source }) };
};
