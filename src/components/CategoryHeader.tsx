import React from 'react';
import '../components/styles/CategoryHeader.css';

const CategoryHeader: React.FC<{ name: string }> = ({ name }) => {
  return <div className="category-header">{name}</div>;
};

export default CategoryHeader;
