import { useEffect, useState } from "react";

export type LayoutType = "tablet" | "phone" | "desktop";

function getLayout(): LayoutType {
  if (window.innerWidth < 600) {
    return "phone";
  } else if (window.innerWidth > 1200) {
    return "desktop";
  } else {
    return "tablet";
  }
}

export function useLayoutType() {
  const [type, setType] = useState<LayoutType>(getLayout);

  useEffect(() => {
    const handler = () => {
      setType(getLayout());
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return type;
}
