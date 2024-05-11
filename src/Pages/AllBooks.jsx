import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllBooks = () => {
const {data:items} = useQuery({
    queryKey:['items'],
    queryFn:async ( )=>{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/items/`)
        return res.json()
    }
})




    return (
        <div>
            <h1>{items.length}</h1>
        </div>
    );
};

export default AllBooks;