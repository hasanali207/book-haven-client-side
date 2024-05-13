import React from 'react'
import useAuth from '../Hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import SingleBorrowBook from '../Components/SingleBorrowBook'

export default function BorrowedBooks() {

  const {user} = useAuth()
  console.log(user)
  const {data:items, isLoading} = useQuery({
    queryKey:['items'],
    queryFn:async ( )=>{
        const res = await fetch(`http://localhost:5000/borrow/book/${user?.email}`)
        return res.json()
    }
})



if(isLoading){
    return <span className="loading loading-bars loading-lg f"></span>

}
  return (
    <>
    <div className='grid grid-cols-3 gap-6'>
      {
        items.map(item => <SingleBorrowBook key={item._id} item={item}></SingleBorrowBook>)
      }
    </div>
    </>
  )
}
