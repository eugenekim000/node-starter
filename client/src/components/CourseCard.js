import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useToggle from '../hooks/useToggle';

export default function CourseCard(props) {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [generalError, setGeneralError] = useState(false);

  let paramID = props.match.params.id;
  const history = useHistory();
  const [toggle, toggleClick] = useToggle();

  useEffect(() => {
    async function fetchData() {
      await fetch(`http://localhost:5000/courses/${paramID}`)
        .then((res) => {
          if (res.ok) return res.json();
          else if (res.status === 404) {
            history.push('/Not-Found');
            return Promise.reject('error 404');
          } else {
            setGeneralError(true);
            return Promise.reject('some other error: ' + res.status);
          }
        })
        .then((course) => {
          console.log(course, 'this is the course');
          let dummy = { ...course, tags: 'this is a tag' };
          setCourse(dummy);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
  }, []);

  return (
    <div className>
      {!loading ? (
        <ul className='course'>
          <li>
            <strong>ID:</strong> {course.id}
          </li>
          <li>
            <strong>Title:</strong> {course.title}
          </li>
          <li onClick={toggleClick}>
            <strong>Tags</strong> {toggle ? '...' : course.tags}
          </li>
        </ul>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
