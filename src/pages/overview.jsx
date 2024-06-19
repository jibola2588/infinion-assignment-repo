import React from 'react';
import styled from 'styled-components'
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { DatePicker, Space } from 'antd';
import { GoPlus } from "react-icons/go";
import imgPlaceholder from '../assets/empty-place-holder.svg'
import {useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

const Container = styled.div``
const Top = styled.div``
const Export = styled.div``
const Bottom = styled.div``

const Overview = () => {
  const navigate = useNavigate();

  const handleCampagn = () => { 
    navigate('/new-campaign')
  }
  
  return (
    <Container className='h-[100%] w-[100%] flex flex-col'>
       <Top className='flex items-center justify-between mt-6 mb-8'> 
          <h3 className='text-2xl mb-0 leading-7 font-bold font-[General-sans] text-primary'>Overview</h3>
          <div className='flex items-center gap-4'>
          <div className='border border-[#F0F4F4] rounded-md p-2 flex items-center w-[380px] cursor-pointer'> 
          <div className='border-r border-[#F0F4F4] flex items-center gap-2 pr-3'> 
           <MdOutlineDateRange style={{color:'#247B7B', width:'20px', height:'20px'}}/>
            <span className='font-[nunito] font-medium text-xs leading-5 text-[#333333]'>Date Range</span>
          </div>
          <span>
          <Space direction="vertical" size={12}>
             <RangePicker  className="no-border custom-placeholder font-[nunito] font-medium text-xs" />
           </Space>
          </span>
           <IoChevronDownOutline style={{color:'#247B7B', width:'24px', height:'24px'}}/>
          </div>
            <Export className='bg-[#F0F4F4] py-[10px] px-8 rounded-md flex items-center gap-1 cursor-pointer' >
              <MdOutlineFileUpload style={{color:'#247B7B', width:'20px', height:'20px'}}/>
              <span className='text-primary font-semibold text-sm leading-5 font-[nunito]'>Upload</span>
            </Export>
          </div>
       </Top>
       <Bottom className='flex-1 flex flex-col items-center justify-center'> 
       <div> 
         <img src={imgPlaceholder} alt='image holder'/>
       </div>
         <span className='font-[nunito] font-semibold text-sm leading-5 text-black mt-4'>No activity yet. Create a new campaign to get started</span>
         <div 
          onClick={handleCampagn}
         className="bg-primary rounded-[4px] p-[10px] flex justify-center shadow-md cursor-pointer mt-6"> 
      <div className="flex gap-2 items-center"> 
       <GoPlus  style={{width:'20px', height:'20px',color:'white'}}/>
      <span className="font-[nunito] font-semibold text-sm leading-5 text-white mb-0"> New Campaign</span>
      </div>
      </div>
       </Bottom>
    </Container>
  );
}

export default Overview;
