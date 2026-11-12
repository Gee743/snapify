import { BEST_TIMES, DRONE_RULES } from "@/app/libs/publicSpaceValidation";

export interface PublicSpaceRecord {
   id: string;
   slug: string;
   name: string;
   type: string;
   locationLabel: string;
   latlng: number[];
   description: string;
   directions: string;
   tips: string[];
   imageSrc: string;
   createdAt: string;
   updatedAt: string;
   city?: string | null;
   district?: string | null;
   province?: string | null;
   category?: string | null;
   entryFee?: string | null;
   isFree?: boolean;
   permitRequired?: boolean;
   permitAuthority?: string | null;
   permitNotes?: string | null;
   droneRule?: string | null;
   droneNotes?: string | null;
   openingHours?: string | null;
   tripodAllowed?: boolean | null;
   shootingNotes?: string | null;
   bestTimeOfDay?: string[];
   bestMonths?: number[];
}

export interface OwnerLead {
   id: string;
   name: string;
   email: string;
   phone: string | null;
   spaceName: string | null;
   locationText: string | null;
   spaceType: string | null;
   message: string | null;
   createdAt: string;
}

export interface SpaceInquiryRecord {
   id: string;
   spaceSlug: string;
   /** Denormalised studio name, captured at enquiry time. */
   spaceName?: string | null;
   name: string;
   email: string;
   phone: string | null;
   shootDate: string | null;
   crewSize?: number | null;
   message: string | null;
   createdAt: string;
}

/** A bookable studio, as /admin reads and writes it. Unlike the public
 *  reader this keeps owner contact, since the dashboard is authenticated. */
export interface StudioRecord {
   id: string;
   slug: string;
   name: string;
   tagline: string;
   type: string;
   description: string;
   locationLabel: string;
   city?: string | null;
   district?: string | null;
   province?: string | null;
   latlng: number[];
   imageSrc: string;
   images: string[];
   studioType: string;
   currency: string;
   hourlyRate?: number | null;
   halfDayRate?: number | null;
   fullDayRate?: number | null;
   minimumHours?: number | null;
   rateNotes?: string | null;
   capacity?: number | null;
   floorAreaSqft?: number | null;
   ceilingHeightFt?: number | null;
   amenities: string[];
   equipment: string[];
   availabilityNotes?: string | null;
   openingHours?: string | null;
   ownerName?: string | null;
   ownerEmail?: string | null;
   ownerPhone?: string | null;
   bookingNotes?: string | null;
   cancellationPolicy?: string | null;
   metaTitle?: string | null;
   metaDescription?: string | null;
   status: string;
   createdAt: string;
   updatedAt: string;
}

export const STUDIO_STATUS_LABELS: Record<string, string> = {
   PUBLISHED: "Published",
   PENDING: "Pending review",
   REJECTED: "Rejected",
};

export interface Subscriber {
   id: string;
   email: string;
   source: string | null;
   createdAt: string;
}

export interface LeadsPayload {
   owners: OwnerLead[];
   inquiries: SpaceInquiryRecord[];
   subscribers: Subscriber[];
}

/** Human labels for the controlled vocabularies the validator enforces. */
export const DRONE_RULE_LABELS: Record<string, string> = {
   ALLOWED: "Allowed",
   PERMIT_REQUIRED: "Permit required",
   PROHIBITED: "Prohibited",
   UNKNOWN: "Unknown",
};

export const BEST_TIME_LABELS: Record<string, string> = {
   sunrise: "Sunrise",
   "golden-hour-am": "Golden hour (AM)",
   midday: "Midday",
   "golden-hour-pm": "Golden hour (PM)",
   sunset: "Sunset",
   "blue-hour": "Blue hour",
   night: "Night",
};

export const MONTH_LABELS = [
   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export { BEST_TIMES, DRONE_RULES };

export const inputClass =
   "mt-2 w-full rounded-lg border border-white/10 bg-[#161616] px-3.5 py-3 text-sm text-white outline-none transition focus:border-[#dcff1a]";
export const labelClass = "block text-sm font-medium text-[#d4d4d4]";

export const formatDate = (iso: string) =>
   new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
   });
