import React from 'react';
import styled from 'styled-components'
import Navbar from '../components/navbar';
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar';
// import Siderbar from '../../components/sidebar'

const Container = styled.div``
const Left = styled.div``
const Right = styled.div``

const DashboardLayout = () => {
  return (
    <Container className='bg-transparent flex item-center h-screen w-full'>
       <Left className='left w-[292px] bg-sidebarBg'>
        <Sidebar />
       </Left>
       <Right className='right flex-1 flex flex-col'>
         <Navbar />
         <div className='px-12 flex-1  w-full overflow-y-auto'> 
             <Outlet />
         </div>
       </Right>
    </Container>
  );
}

export default DashboardLayout;
