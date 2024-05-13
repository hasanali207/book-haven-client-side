import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function SingleCatData() {
    const {category} = useParams()
    const [items, setItems] = useState([]); 

    React.useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:5000/data/${category}`);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchItems();
    }, [category]);





  return (
    <div className='flex flex-col lg:flex-row justify-between space-y-3 lg:space-y-0 gap-6 py-10'>
            {items && items.map(item => (
                <div key={item._id} className="card text-[#150B2B] shadow-xl border-2 border-slate-100">
                    <figure><img className='w-full hover:scale-105 duration-300 ease-in-out' src={item.image} alt="Shoes" /></figure>
                    <div className="card-body bg-slate-200">
                        <h2 className="card-title">
                            {item.name}
                        </h2>
                        <div className="badge bg-orange-400 text-white">{item.category}</div>
                        <p>{item.description}</p>
                        <div className="flex justify-between">
                            
                            <div className="badge badge-outline">Rating: {item.rating}</div>
                            <div className="badge badge-outline">{item.stock_status}</div>
                        </div>
                    </div>
                    <Link to={`/singleitem/${item._id}`}>
                        <button className='rounded-b-2xl bg-gradient-to-r from-purple-700 to-purple-800 py-3 text-white w-full'>View Details</button>
                    </Link>
                </div>
            ))}
        </div>
  )
}
