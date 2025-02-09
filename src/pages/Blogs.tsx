import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import SectionTitle from '../components/SectionTitle';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

const BlogList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <article key={blog.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(blog.date).toLocaleDateString()}
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              {blog.title}
            </h2>
            <p className="text-gray-600 mb-4">{blog.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-600">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            <Link
              to={`/blogs/${blog.id}`}
              className="inline-flex items-center text-orange-600 hover:text-orange-700"
            >
              Read More
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

const BlogPost = () => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-8">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(blog.date).toLocaleDateString()}
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">{blog.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-600">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        <div className="prose prose-orange max-w-none">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-gray-500">Written by {blog.author}</p>
        </div>
      </div>
    </article>
  );
};

const Blogs = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle
          title="Adventure & Travel Blog"
          subtitle="Discover insights, guides, and stories from India's top adventure destinations"
        />
        {id ? <BlogPost /> : <BlogList />}
      </div>
    </div>
  );
};

export default Blogs;