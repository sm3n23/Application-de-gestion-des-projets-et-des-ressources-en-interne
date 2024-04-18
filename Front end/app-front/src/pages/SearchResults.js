import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResults() {
    const query = useQuery();
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const name = query.get("name");
            const start = query.get("start");
            const end = query.get("end");

            const { data } = await axios.get(`http://localhost:8085/projects/search`, {
                params: { name, startPeriod: start, endPeriod: end }
            });
            setResults(data);
        };

        fetchResults();
    }, [query]);

    return (
        <div className="container">
            <h2>Search Results</h2>
            <ul>
                {results.map(item => (
                    <li key={item.id}>{item.name} - {item.startDate} to {item.finishDate}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;
