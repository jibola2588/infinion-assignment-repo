import React, {useEffect } from 'react';
import {Modal } from 'antd';
import img from '../../assets/check.svg'
import { useNavigate } from 'react-router';

const SuccessMessage = ({text,modalOpen,setModalOpen}) => {
   const navigate = useNavigate();

   const goBack = () => { 
    navigate('/campaign')
   }

  return (
    <>
      <Modal
        centered
        open={modalOpen}
        footer={null}  
        className="custom-modal"
      >
       <section className='flex flex-col items-center space-y-9'> 
          <div className='w-[90px] h-[90px] bg-primary rounded-full flex items-center justify-center'>
            <span>
                <img src={img} alt='image' />
            </span>
          </div>
          <div className='font-[nunito] font-semibold text-sm leading-5 text-center text-[#666666]'>
          Campingn Successfully Created! 
          </div>
          <div 
          onClick={goBack}
          className='font-[syne] font-bold text-xs leading-4 py-4 px-8 text-center bg-primary rounded-md cursor-pointer text-white'> 
          Go Back to campaign list
           </div>
       </section>
      </Modal>
    </>
  );
};
export default SuccessMessage;
