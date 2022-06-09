import { useEffect, useState } from "react";
import { Links } from "../../common/components/elements/links";
import { Tags } from "../../common/components/elements/Tags";
import Layout from "../../common/layouts/Layout";
import { Input } from "../../common/components/elements/inputField";
import url from "../../common/constants/backendUrl";

export async function getStaticProps (context) {
  const response = await fetch(`${url}/post/tags`);
  const tags = await response.json();
  return {
    props: { tags },
  };
}

export default function Categories({ tags }) {
  const [categories, setCategories] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    var allInOneTags = [];
    tags.forEach((tag) => {
      // allInOneTags.push(...tag.tags)
      allInOneTags = [...allInOneTags, ...tag.tags];
    });
    const uniqueChars = [...new Set(allInOneTags)];
    setCategories(uniqueChars);
  }, []);

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchFilter(lowerCase);
  };

  const filteredData = categories.filter((tag) => {
    if (searchFilter === "") {
      return tag;
    } else {
      return tag.toLowerCase().includes(searchFilter);
    }
  });

  return (
    <Layout title="Categories">
      <div className="sticky top-16 w-11/12 sm:w-96 mb-10">
        <Input label="Filter Tags" placeholder="Search for a Tag or Category" onChange={inputHandler} />
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        {filteredData.map((category, index) => {
          return (
            <Links key={category + index} href={`/tags/${category}`}>
              <Tags>{category}</Tags>
            </Links>
          );
        })}
      </div>
    </Layout>
  );
}
