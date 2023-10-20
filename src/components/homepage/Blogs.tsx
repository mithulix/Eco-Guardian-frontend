import React from 'react'
import BlogCard from '../mulitUse/BlogCard';

export default function Blogs() {
  return (
    <div className="section-padding">
    <h2 className="section-heading">Our Blogs</h2>
    <div className="card_div">
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  </div>
);
}