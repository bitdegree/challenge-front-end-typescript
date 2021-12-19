import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navigation from '../../Layout/Navigation/Navigation';
import Blog from '../../Layout/Blog/Blog';

const HomeContainer = styled.section`
  padding-top: 5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
`;

const Home = () => {
  const baseUrl: string = process.env.REACT_APP_BASE_URL as string;
  const [fetchedData, setFetchedData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(baseUrl, {
        params: {
          _limit: 10,
        },
      })
      .then((res) => {
        setFetchedData(res.data);
      })
      .catch((error) => {
        alert('error');
      });
  }, []);

  return (
    <>
      <Navigation text1="New post" link1="/create" />
      <HomeContainer>
        {fetchedData.length === 0 ? (
          <h2>No Blogs found, please Add new one</h2>
        ) : (
          fetchedData.map((blogs) => (
            <Blog
              key={blogs.id}
              link={`/${blogs.id}`}
              children="View Blog"
              {...blogs}
            />
          ))
        )}
      </HomeContainer>
    </>
  );
};

export default Home;
