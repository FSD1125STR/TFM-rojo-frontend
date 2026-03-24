import { useContext, useEffect } from "react";
import { HeaderContext } from "../context/HeaderContext.js";

export function useHeader({ title, breadcrumbs = [], actions = null } = {}) {
  const context = useContext(HeaderContext);
  const { setHeader, resetHeader } = context;
  const breadcrumbsJson = JSON.stringify(breadcrumbs);

  useEffect(() => {
    setHeader({ title, breadcrumbs: JSON.parse(breadcrumbsJson), actions });
    return () => resetHeader();
  }, [title, breadcrumbsJson, actions, setHeader, resetHeader]);

  return context;
}
