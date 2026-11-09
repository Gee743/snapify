"use client";

import dynamic from "next/dynamic";

// Leaflet touches `window` at import time, so the map itself must stay
// client-only. Isolating it here keeps the surrounding page server-rendered
// instead of deopting the whole route into client-side rendering.
const Map = dynamic(() => import("@/app/components/Map"), {
   ssr: false,
   loading: () => <div className="h-[35vh] rounded-lg bg-white/[0.04]" />,
});

const MapSection = ({ center }: { center: number[] }) => <Map center={center} />;

export default MapSection;
