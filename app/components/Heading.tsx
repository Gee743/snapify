"use client";

interface HeadingProps {
   title: string;
   subtitle?: string;
   center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => (
   <div className={center ? "text-center" : "text-start"}>
      <h2 className="text-[21px] font-semibold tracking-[-0.02em] text-cream">{title}</h2>
      {subtitle && (
         <p className="mt-1.5 max-w-[52ch] text-[14px] leading-6 text-cream-muted">{subtitle}</p>
      )}
   </div>
);

export default Heading;
