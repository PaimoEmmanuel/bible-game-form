import { useEffect, useState } from "react";
import useCategoriesAndTags from "./use-categories-and-tags";

const useFormPopulate = () => {
  const {
    loadingCategories,
    categories,
    categoriesError,
    loadingTags,
    tags,
    tagsError,
  } = useCategoriesAndTags();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!loadingTags && !loadingCategories) {
      setLoading(false);
    }
    if (tagsError) {
      setError(tagsError);
    }
    if (categoriesError) {
      setError(categoriesError);
    }
  }, [loadingTags, loadingCategories, categoriesError, tagsError]);
  return { loading, tags, categories, error };
};

export default useFormPopulate;
