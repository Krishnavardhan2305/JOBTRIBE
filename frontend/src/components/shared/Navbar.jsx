import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { User2, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
  // const user=true;
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      console.log('Logout Response:', res);  // Log the entire response to check
      if (res.data.success) {  // Check for 'success' field, not 'succes'
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error: ", error);
      toast.error(error.response?.data?.message || "Logout failed. Please try again.");
    }
  };

  return (
    <div>
      <div className='bg-white'>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16 '>
          <div>
            <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Tribe</span></h1>
          </div>
          <div className='flex items-center gap-2'>
            <ul className='flex font-medium items-center gap-5'>
              {
                user && user?.role === "student" ? (
                  <>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/jobs'>Jobs</Link></li>
                    <li><Link to='/browse'>Browse</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to='/admin/companies'>Companies</Link></li>
                    <li><Link to='/admin/jobs'>Jobs</Link></li>
                  </>
                )
              }
            </ul>
            {
              !user ? (
                <div className='flex items-center gap-2'>
                  <Link to="/login">
                    <Button variant="out">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className='bg-[#6A38C2] hover:bg-[#1e0647]'>Signup</Button>
                  </Link>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger asChild className='mx-5'>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className='flex gap-4 space-y-2'>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                      </Avatar>
                      <div>
                        <h4 className='font-bold text-2xl'>{user.name}</h4>
                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                      </div>
                    </div>
                    <div className='flex justify-between items-center'>
                     {
                        user && user.role==='student'&&(
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                          <User2 />
                          <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                        </div>
                        )
                     }
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link">Logout</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
