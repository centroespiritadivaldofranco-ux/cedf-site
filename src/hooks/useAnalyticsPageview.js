import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { registrarPageview } from "../lib/analytics";

export function useAnalyticsPageview() {
  const location = useLocation();
  useEffect(() => {
    registrarPageview(location.pathname + location.search);
  }, [location.pathname, location.search]);
}
