"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function EditionDate() {
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    setDateStr(format(new Date(), "EEEE, MMMM d, yyyy"));
  }, []);

  return (
    <span className="font-sans text-[10px] text-[#555]">
      Vol. CXLII · {dateStr || "Today's Edition"}
    </span>
  );
}
