import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsSelector } from "../../reducers/postsReducer";
import { fetchPosts } from "../../actions/postsActions";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Card from "../../components/Card/index";
import SkeletonLoader from "../../components/SkeletonLoader";
import Pagination from "../../components/Pagination/index";
import "./homepage.css";
import { handlePagination } from "./../../utils/paginate";

const HomePage = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, hasErrors } = useSelector(postsSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 20;
  const currentPagePosts = handlePagination(posts, currentPage, PAGE_SIZE);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const renderPosts = () => {
    if (isLoading)
      return (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      );

    if (hasErrors) return <p>Unable to display posts, please try again.</p>;

    return currentPagePosts.map((post: Record<string, any>) => (
      <Card key={post.id} id={post.id} title={post.title} body={post.body} />
    ));
  };

  return (
    <>
      <Header pageName="Home" />
      <Navigation />
      <main className="contentContainer">{renderPosts()}</main>
      {!isLoading && !hasErrors && (
        <Pagination
          posts={posts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default HomePage;
