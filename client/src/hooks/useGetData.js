import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function useGetData(paramID) {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      await fetch(`http://localhost:5000/courses/${paramID}`)
        .then((res) => {
          if (res.ok) return res.json();
          else if (res.status === 404) {
            history.push('/Not-Found');
            return Promise.reject('error 404');
          } else {
            return Promise.reject('some other error: ' + res.status);
          }
        })
        .then((course) => {
          console.log(course, 'this is the course');
          let dummy = { ...course, tags: 'this is a tag' };
          setCourse(course);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
  }, []);

  return [course, loading];
}
