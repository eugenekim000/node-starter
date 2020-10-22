import React, { useEffect, useState } from 'react';
import './App.css';
import useGetData from './hooks/useGetData';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    async function fetchData() {
      fetch('http://localhost:5000/courses/1')
        .then((res) => res.json())
        .then((course) => {
          setCourse({ course: course });
          setLoading(false);
        });
    }

    fetchData();
  }, []);

  return (
    <div className='test'>
      {!loading ? (
        <ul className='course'>
          <li>
            <strong>ID:</strong> {course.id}
          </li>
          <li>
            <strong>Title:</strong> {course.title}
          </li>
        </ul>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
