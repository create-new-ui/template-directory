import { useEffect, useState } from "react";
import CategoryNav from "./CategoryNav";
import CardsContainer from "./CardsContainer";

export default function Dashboard({ category }) {
  const [currentSort, setCurrentSort] = useState("nameAsc");
  const [randomSeed, setRandomSeed] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleSortChange = (e) => {
      const detail = e?.detail || {};
      if (detail.sort) setCurrentSort(detail.sort);
      if (typeof detail.randomSeed !== "undefined") setRandomSeed(detail.randomSeed);
    };

    const handleSearch = (e) => {
      const detail = e?.detail || {};
      if (typeof detail.query !== "undefined") {
        setSearchQuery(detail.query);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("tools:sort-change", handleSortChange);
      window.addEventListener("tools:search", handleSearch);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("tools:sort-change", handleSortChange);
        window.removeEventListener("tools:search", handleSearch);
      }
    };
  }, []);

  return (
    <>
      <CategoryNav filter={category} />
      <CardsContainer
        filter={category}
        sort={currentSort}
        randomSeed={randomSeed}
        searchQuery={searchQuery}
      />
    </>
  );
}
