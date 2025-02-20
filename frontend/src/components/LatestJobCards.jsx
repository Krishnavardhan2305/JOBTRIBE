import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate=useNavigate();
  return (
    <div  onClick={()=>navigate(`/description/${job._id}`)}className='p-5 rounded-md shadow-xl bg-slate-200 border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='text-lg font-black'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500 font-serif'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-700 font-medium'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'text-[#F83002] font-bold font-serif'} variant="ghost">{job?.salary}LPA</Badge>
            <Badge className={'text-[#7209b7] font-black'} variant="ghost">{job?.position} Positions</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards
