"use client";

export type AdminSection = "spaces" | "add" | "studios" | "addStudio" | "leads";

interface NavItem {
   id: AdminSection;
   label: string;
   hint: string;
   count?: number;
}

interface AdminSidebarProps {
   active: AdminSection;
   onSelect: (section: AdminSection) => void;
   spaceCount: number;
   studioCount: number;
   leadCount: number;
   isEditing: boolean;
   isEditingStudio: boolean;
   onSignOut: () => void;
}

const Icon = ({ name }: { name: AdminSection }) => {
   const common = {
      width: 18,
      height: 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.7,
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
      "aria-hidden": true,
   };
   if (name === "spaces") {
      return (
         <svg {...common}>
            <path d="M12 21s-7-5.1-7-10a7 7 0 1 1 14 0c0 4.9-7 10-7 10Z" />
            <circle cx="12" cy="11" r="2.5" />
         </svg>
      );
   }
   if (name === "add" || name === "addStudio") {
      return (
         <svg {...common}>
            <path d="M12 5v14M5 12h14" />
         </svg>
      );
   }
   if (name === "studios") {
      return (
         <svg {...common}>
            <path d="M3 21V8l9-5 9 5v13" />
            <path d="M3 21h18" />
            <path d="M9 21v-6h6v6" />
         </svg>
      );
   }
   return (
      <svg {...common}>
         <path d="M4 6h16v12H4z" />
         <path d="m4 7 8 6 8-6" />
      </svg>
   );
};

const AdminSidebar = ({
   active,
   onSelect,
   spaceCount,
   studioCount,
   leadCount,
   isEditing,
   isEditingStudio,
   onSignOut,
}: AdminSidebarProps) => {
   const items: NavItem[] = [
      { id: "spaces", label: "Public spaces", hint: "Free, community", count: spaceCount },
      { id: "add", label: isEditing ? "Edit space" : "Add a space", hint: "Full details" },
      { id: "studios", label: "Studios", hint: "Paid, bookable", count: studioCount },
      {
         id: "addStudio",
         label: isEditingStudio ? "Edit studio" : "Add a studio",
         hint: "Rates and amenities",
      },
      { id: "leads", label: "Leads inbox", hint: "Owners and enquiries", count: leadCount },
   ];

   return (
      <nav
         aria-label="Admin sections"
         className="flex gap-2 overflow-x-auto border-b border-white/10 bg-[#0d0d0d] p-3 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-5"
      >
         <div className="hidden lg:block">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#dcff1a]">SNAPIFY</p>
            <p className="mt-1 text-sm text-[#929292]">Team dashboard</p>
         </div>

         <ul className="flex gap-2 lg:mt-7 lg:flex-col lg:gap-1">
            {items.map((item) => {
               const isActive = active === item.id;
               return (
                  <li key={item.id} className="shrink-0 lg:w-full">
                     <button
                        type="button"
                        onClick={() => onSelect(item.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex w-full items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-sm transition ${
                           isActive
                              ? "bg-[#dcff1a]/[0.08] text-[#dcff1a]"
                              : "text-[#b8b8b8] hover:bg-white/[0.04] hover:text-white"
                        }`}
                     >
                        <span className={isActive ? "text-[#dcff1a]" : "text-[#737373]"}>
                           <Icon name={item.id} />
                        </span>
                        <span className="flex-1">
                           <span className="block font-medium">{item.label}</span>
                           <span className="hidden text-xs text-[#737373] lg:block">{item.hint}</span>
                        </span>
                        {item.count !== undefined && item.count > 0 && (
                           <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-xs text-[#b8b8b8]">
                              {item.count}
                           </span>
                        )}
                     </button>
                  </li>
               );
            })}
         </ul>

         <button
            type="button"
            onClick={onSignOut}
            className="ml-auto shrink-0 self-center rounded-lg border border-white/15 px-4 py-2 text-sm text-[#d4d4d4] transition hover:border-[#dcff1a] hover:text-[#dcff1a] lg:ml-0 lg:mt-auto lg:w-full lg:self-auto"
         >
            Sign out
         </button>
      </nav>
   );
};

export default AdminSidebar;
