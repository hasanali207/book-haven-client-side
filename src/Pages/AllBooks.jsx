import { useQuery } from '@tanstack/react-query';
import SingleBook from '../Components/SingleBook';

const AllBooks = () => {
const {data:items, isLoading} = useQuery({
    queryKey:['items'],
    queryFn:async ( )=>{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/items/`)
        return res.json()
    }
})



if(isLoading){
    return <span className="loading loading-bars loading-lg f"></span>

}

    return (
        <div className='grid grid-cols-3 gap-6'>
           {
            items.map(item => <SingleBook key={item._id} item={item}></SingleBook>)
           }
        </div>
    );
};

export default AllBooks;