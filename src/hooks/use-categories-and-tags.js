import { useEffect, useState } from "react";
import { getCategories, getTags } from "../services/services";
import { getToken } from "../services/token-handler";

const useCategoriesAndTags = () => {
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState();

  const [loadingTags, setLoadingTags] = useState(true);
  const [tags, setTags] = useState({});
  const [tagsError, setTagsError] = useState();
  useEffect(() => {
    getToken().then((res) => {
      getCategories()
        .then((res) => {
          const categories = res.data.map((category) => ({
            value: category.name,
            label:
              category.name.charAt(0).toUpperCase() + category.name.slice(1),
          }));
          setCategories(categories);
          setLoadingCategories(false);
        })
        .catch((err) => {
          setCategoriesError(err.message);
          setLoadingCategories(false);
        });

      getTags()
        .then((res) => {
          const tags = res.data.map((tag) => ({
            value: tag.id,
            label: tag.name,
          }));
          setTags(tags);
          setLoadingTags(false);
        })
        .catch((err) => {
          setTagsError(err.message);
          setLoadingTags(false);
        });
    });
  }, []);

  return {
    loadingCategories,
    categories,
    categoriesError,
    loadingTags,
    tags,
    tagsError,
  };
};

export default useCategoriesAndTags;
