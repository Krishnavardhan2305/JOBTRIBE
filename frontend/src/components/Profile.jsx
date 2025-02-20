import React, { useState } from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  if (!user) {
    return <div>Loading...</div>; // Or redirect to login page
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage src={user.profile?.profilePhoto || "https://th.bing.com/th/id/OIP.9kLadk-ff48v9vs0zQL12QHaE7?rs=1&pid=ImgDetMain"} />
            </Avatar>
            <div>
              <h1>{user.name}</h1>
              <p>{user.profile?.bio}</p>
            </div>
          </div>
          <Button className='text-right' variant='outline' onClick={() => setOpen(true)}>
            <Pen />
          </Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div className='my-6'>
          <h1>Skills</h1>
          <div className='flex items-center gap-1'>
            {user.profile?.skills && user.profile.skills.length !== 0 ?
              user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>) :
              <span>NA</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-md font-bold'>Resume</Label>
          {isResume && user.profile?.resume ?
            <a target="_blank" href={user.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user.profile.resumeOriginalName}</a> :
            <span>NA</span>
          }
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-emerald-800'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
