import { useEffect, useState } from 'react';

export default function useGetData() {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/courses/1')
      .then((res) => res.json())
      .then((course) => {
        setCourse({ course: course });
        setLoading(false);
      });
  }, []);

  return [course, loading];
}
