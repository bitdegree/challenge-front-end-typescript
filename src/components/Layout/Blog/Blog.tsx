import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BlogWrapper = styled.div`
  width: 20rem;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;

  .link {
    text-decoration: none;
    background: #0275d8;
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: white;
  }
`;

interface Props {
  userId: number;
  id: number;
  title: string;
  body: string;
  link: string;
}

const Blog: FC<Props> = ({ userId, id, title, body, link, children }) => (
  <BlogWrapper>
    <p>{`User id: ${userId}`}</p>
    <p>{`Blog's id: ${id}`}</p>
    <p>{`title: ${title}`}</p>
    <p>{body}</p>
    <Link className="link" to={link}>
      {children}
    </Link>
  </BlogWrapper>
);

export default Blog;
