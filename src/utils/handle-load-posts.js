export async function handleLoadPosts() {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all(
      [postsResponse, photosResponse]
    );

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((posts, index) => {
      return { ...posts, cover: photosJson[index].url }
    });

    return postsAndPhotos;
}