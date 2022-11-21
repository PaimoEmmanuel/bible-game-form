import { useEffect, useState } from "react";
import useCategories from "./use-categories";
import useTags from "./use-tags";

const useFormPopulate = () => {
  const [loadingCategories, categories] = useCategories();
  const [loadingTags, tags] = useTags();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!loadingTags && !loadingCategories) {
      setLoading(false);
    }
  }, [loadingTags, loadingCategories]);
  return [loading, tags, categories];
};

export default useFormPopulate;
