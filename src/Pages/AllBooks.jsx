import { useEffect, useState } from 'react';
import SingleBook from '../Components/SingleBook';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { IoGrid } from "react-icons/io5";
import { FaTableList } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const AllBooks = () => {
    const [items, setItems] = useState([]);
    const [showAvailable, setShowAvailable] = useState(false);

    // Fetch items from the backend API
    useEffect(() => {
        fetch(`http://localhost:5000/items`)
            .then(res => res.json())
            .then(data => {
                setItems(data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, []);

  
    const handleShowAvailable = () => {
        setShowAvailable(!showAvailable); 
    };

    
    const filteredItems = showAvailable ? items.filter(item => item.quantity > 0) : items;

    return (
        <div className='relative py-6'>


        <div className=' absolute right-0 -top-2 flex justify-end'>
            
        <button className='btn m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 mt-3' onClick={handleShowAvailable}>
                {showAvailable ? 'Show All' : 'Show Available'}
            </button>
        </div>
            
            <Tabs>
    <TabList>
      <Tab><IoGrid></IoGrid></Tab>
      <Tab><FaTableList></FaTableList></Tab>
    </TabList>

    <TabPanel>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredItems.map(item => (
                    <SingleBook key={item._id} item={item} />
                ))}
            </div>
    </TabPanel>
    <TabPanel>

    <table className="border-collapse border-slate-400  w-full">
  <thead>
    <tr className="border border-slate-400 ">
      <th className="border border-slate-400  py-2">Index</th>
      <th className="border border-slate-400  py-2">Item Name</th>
      <th className="border border-slate-400  py-2">Description</th>
      <th className="border border-slate-400  py-2">Subcategory</th>
      <th className="border border-slate-400  py-2">Actions</th>
    </tr>
  </thead> 
    <tbody>
    {filteredItems.map((item, idx) => (
      <tr key={idx} className="border">
        <td className="border border-slate-400 py-2 text-center">{idx + 1}</td>
        <td className="border border-slate-400 py-2 text-center">{item.image}</td>
        
        <td className="border border-slate-400  py-2 text-center">{item.name}</td>
        <td className="border border-slate-400  py-2 text-center">{item.description}</td>
        <td className="border  border-slate-400 py-2 text-center">{item.category}</td>
        <td className="border border-slate-400  py-2 text-center">
          <Link to={`/singleitem/${item._id}`}>
            <button className="bg-slate-300 py-2 px-4 font-medium rounded-2xl my-4">
              Details
            </button>
          </Link>
          <Link to={`/items/update/${item._id}`}> <button className="btn btn-primary btn-outline">Edit</button></Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </TabPanel>
  </Tabs>

        </div>
    );
};

export default AllBooks;
