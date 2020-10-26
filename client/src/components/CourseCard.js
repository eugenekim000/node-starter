import React from 'react';
import useToggle from '../hooks/useToggle';
import useGetData from '../hooks/useGetData';
import Tags from './Tags';

export default function CourseCard(props) {
  let paramID = props.match.params.id;
  const [toggle, toggleClick] = useToggle();

  const [course, loading] = useGetData(paramID);

  return (
    <div className>
      {!loading ? (
        <div className='course'>
          <ul>
            <li>
              <strong>ID:</strong> {course.id}
            </li>
            <li>
              <strong>Title:</strong> {course.title}
            </li>
            <li onClick={toggleClick} className='tag-li'>
              {/* created a separate tag component for future cases
            ie adding api calls to get to all matching tags when clicked*/}
              <strong>Tags</strong>{' '}
              {toggle ? '...' : <Tags tags={course.tags} />}
            </li>
          </ul>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
