import React, {useState, useEffect} from 'react';
import axiosInstance from '../axiosApi';

export default function Dashboard() {
    const [list, setList] = useState([]);

    useEffect(() => {
        localStorage.removeItem('refresh_token')
        axiosInstance.get('/board/list')
            .then((result) => {
                console.log(result.data.boards);
                setList(result.data.boards)
            });
    }, [])


    return (
        <div>
            <ul>
                {list && list.map((tdd) => <li key={tdd.id}>{tdd.name}</li>)}
            </ul>
        </div>
    );
}