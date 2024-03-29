//this a custom hook to fetch our data
import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await axios.get(url);
                setData(res.data);
                // console.log(res.data);
            }
            catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, []);


    const reFetch = async () => {
        setLoading(true)

        try {
            const res = await axios.get(url);
            setData(res.data);
        }
        catch (err) {
            setError(err);
        }
        setLoading(false);
    };
    return { data, loading, error, reFetch }
}

export default useFetch