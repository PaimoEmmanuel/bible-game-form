import { useEffect, useState } from "react";
import { getCategories } from "../services/services";

const useCategories = () => {
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState();
  useEffect(() => {
    getCategories()
      .then((res) => {
        const categories = res.data.map((category) => ({
          value: category.name,
          label: category.name.charAt(0).toUpperCase() + category.name.slice(1),
        }));
        setCategories(categories);
        setLoadingCategories(false);
      })
      .catch((err) => {
        setCategoriesError(err.message);
      });
  }, []);

  return [loadingCategories, categories, categoriesError];
};

export default useCategories;
