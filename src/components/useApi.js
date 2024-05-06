import { useState, useEffect } from 'react';
import axios from 'axios';

function useApi(relativeUrl, params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let config = {
          method: 'get',
          url: relativeUrl,
          headers: { 
            'x-api-key': '72njgfa948d9aS7gs5'
          },
          params,
        };

        const response = await axios.request(config);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [relativeUrl, params]);

  return { data, loading, error };
}

export default useApi;