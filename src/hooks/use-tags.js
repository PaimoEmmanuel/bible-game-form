import { useEffect, useState } from "react";
import { getTags } from "../services/services";

const useTags = () => {
  const [loadingTags, setLoadingTags] = useState(true);
  const [tags, setTags] = useState({});
  const [tagsError, setTagsError] = useState();
  useEffect(() => {
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
      });
  }, []);

  return [loadingTags, tags, tagsError];
};

export default useTags;
