import React from 'react';
import Tag from './Tag';

export default function Tags(props) {
  let tagString = props.tags;
  let tagArray = tagString.split(',');

  return (
    <div className='tags-container'>
      {tagArray.map((tag, i) => (
        <Tag tag={tag} key={i} />
      ))}
    </div>
  );
}
