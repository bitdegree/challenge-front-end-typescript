import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navigation from '../../Layout/Navigation/Navigation';
import Blog from '../../Layout/Blog/Blog';

const PostContainer = styled.section`
  padding-top: 5rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
`;

const Post = () => {
  const baseUrl: string = process.env.REACT_APP_BASE_URL as string;
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [usersId, setUsersId] = useState(Number);
  const [BlogId, setBlogID] = useState(Number);
  const [titleName, setTitleName] = useState('');
  const [bodyName, setBodyName] = useState('');

  const params = useParams();

  useEffect(() => {
    axios
      .get(`${baseUrl}/${params.id}`)
      .then((res) => {
        setFetchedData(res.data);
        setUsersId(res.data.userId);
        setBlogID(res.data.id);
        setTitleName(res.data.title);
        setBodyName(res.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navigation text1="New post" link1="/create" />
      <PostContainer>
        {fetchedData.length === 0 ? (
          <h2>No Blogs found, please Add new one</h2>
        ) : (
          <Blog
            key={BlogId}
            link={`/edit/${BlogId}`}
            userId={usersId}
            id={BlogId}
            title={titleName}
            body={bodyName}
            children="Edit blog"
          />
        )}
      </PostContainer>
    </>
  );
};

export default Post;
