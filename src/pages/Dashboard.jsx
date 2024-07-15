import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
         const { loading: profileLoading } = useSelector(
           (state) => state.profile
         );
         const { loading: authLoading } = useSelector(
           (state) => state.auth
         );

         if(profileLoading || authLoading) {
        return (
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <div className="spinner "></div>
                </div>
        )
         }

  return (
    <div>
       <div className="relative flex min-h-[calc(100vh-[3.5rem)]"></div>
       {/* <Sidebar /> */}
       {/* <div className="mx-auto w-11/12 max-w-[1000px] py-10">
       <Outlet />
       </div> */}
       <div className="text-white bg-caribbeangreen-400 border border-solid border-pure-greys-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus dolores earum voluptas reiciendis laudantium quod quidem accusamus consequatur minima, aliquid natus. Nihil minus rerum numquam sit quis similique est eum?</div>
    </div>
  )
}

export default Dashboard