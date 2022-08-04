import './styles.css';

import { handleLoadPosts } from '../../utils/handle-load-posts';
import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { TextInput } from '../../components/TextInput';
import { useCallback, useEffect, useState } from 'react';

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    : posts;
    
  const loadPosts = useCallback (async (page, postsPerPage) => {
    const postsAndPhotos = await handleLoadPosts();
    
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos)
  }, []);
    
  useEffect(() => {
    loadPosts(0, postsPerPage);
  }, [loadPosts, postsPerPage]);

  const loadMorePosts = () => {    
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };
    
  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  const noMorePosts = page + postsPerPage >= allPosts.length;
  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}

        <TextInput
          searchValue={searchValue}
          handleChange={handleChange}
        />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>No posts found =(</p>}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}
