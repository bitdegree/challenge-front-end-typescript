import { Blog } from 'src/app/components/pages/home/blogs/blogs';
import { CONSTANTS } from 'src/assets/constants';
import { photo } from './types';

export function makeBlog(blog: Blog, route: string) {
  const photoId = ('photo' + route) as photo['photos'];
  const photo = CONSTANTS[photoId];
  const titleArray = blog.title.split(' ');
  const titleLength = titleArray.length;
  const primaryTitle = titleArray.slice(0, titleLength / 2).join(' ');
  const secondaryTitle = titleArray.slice(titleLength / 2).join(' ');
  const updatedBlog = { ...blog, primaryTitle, secondaryTitle, photo };

  return updatedBlog;
}

export function getPhotos() {
  return [
    CONSTANTS.photo1,
    CONSTANTS.photo2,
    CONSTANTS.photo3,
    CONSTANTS.photo4,
    CONSTANTS.photo5,
    CONSTANTS.photo6,
    CONSTANTS.photo7,
    CONSTANTS.photo8,
    CONSTANTS.photo9,
    CONSTANTS.photo10,
  ];
}
