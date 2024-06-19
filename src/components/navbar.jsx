import React from 'react';
import styled from 'styled-components'
import img from '../assets/search.svg'
import { RxBell } from "react-icons/rx";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";


const Container = styled.div``
const Left = styled.div``
const Right = styled.div``

const Navbar = () => {
  return (
   <Container className='h-[92px] flex items-center justify-between px-12 border-b border-b-[#F3F3F3]'> 
      <Left className='border border-[#999999] rounded-md py-3 px-[10px] w-[391px] flex items-center gap-1'>
        <input 
            placeholder='Search...'
            className='bg-transparent border-none outline-none font-[nunito] text-xs leading-4 font-semibold text-[#666666] flex-1'
        />
        <img alt='image' src={img} />
      </Left>
      <Right className='flex items-center space-x-3'>
           <div className='py-2 pr-3 border-r border-r-[#F0F4F4]'> 
             <RxBell />
           </div>
           <div className='flex items-center space-x-[6px]'> 
           {/* <span className='w-[48px] h-[48px] pt-[6px]'>
               <img src={avatar} alt='avatar image' className='w-[100%] h-[100%] object-cover'/>
           </span> */}
           <div style={{border:'1px dashed #8faab5', width:'35px',height:'35px', borderRadius:'100%'}} className='flex items-center justify-center'> 
              <span className='bg-[#EEEFF0] w-[28px] h-[28px] rounded-full flex items-center justify-center'> 
                 <FaUser style={{width:'16px',height:'16px',color:'#90ACB4'}}/>
              </span>
           </div>
           <div className='flex items-center'> 
           <span className='font-[nunito] font-semibold text-sm leading-5 text-[#33333]'>BigTech</span>
           <IoChevronDownOutline style={{width:'20px',height:'20px',color:'#247B7B', cursor:'pointer'}}/>
           </div>
           </div>
      </Right>
   </Container>
  );
}

export default Navbar;
