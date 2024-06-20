import React, { useState } from 'react';
import { campaignService } from '../../services/campaign_service'; 
import { useNavigate } from 'react-router';
import {Modal } from 'antd';

const DeleteMessage = ({modalOpen,id,onClose,setModalOpen}) => {
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false)
    const [showMessage,SetShowMessage] = useState(true)

    const handleCancel = () => { 
      setModalOpen(false)
    }

    const goToCampaign = () => { 
      onClose();
     }

    const deleteCampaign = async () => { 

      setIsLoading(true);
      try{ 
        const  res = await campaignService.deleteCampaign(id);
        if(res){ 
          setIsLoading(false);
          SetShowMessage(false)
        }
      }catch(err){ 
        setIsLoading(false);
      }
    }

  return (
    <>
      <Modal
        centered
        open={modalOpen}
        footer={null}  
        className="custom-modal"
      >
      {showMessage ?  <section className=''> 
          <h3 className='font-[nunito] font-semibold leading-6 text-[#666666] mb-2 text-center'>Stop Campaign</h3>
          <hr className='border border-[#F0F4F4]'/>
          <div className='my-5 max-w-[320px] mx-auto font-[nunito] text-sm leading-5 text-center'>
          Are You sure you want to delete MTN campaign?
          This action cannot be undone.
          </div>
          <div className='flex items-center justify-center'>
          <div className="pt-4 pb-4 flex items-center gap-4">
              <span 
              onClick={handleCancel}
              className="border border-black bg-white text-black rounded-md w-[110px] pb-2 pt-[10px] flex items-center justify-center cursor-pointer font-[nunito] font-semibold text-xs leading-4">
              Cancel
              </span>
              <span
              onClick={deleteCampaign}
                className="border border-#990000 bg-[#990000] text-white rounded-md w-[126px] pb-2 pt-[10px] flex items-center justify-center cursor-pointer font-[nunito] font-semibold text-xs leading-4">
              {isLoading ? 'loading ...' : 'Delete Campaign'}
              </span>
            </div>
            </div>
      </section> : ( 
        <section> 
        <h3 className='font-[nunito] font-semibold leading-6 text-[#666666] mb-2 text-center'>Campaign Deleted</h3>
        <hr className='border border-[#F0F4F4]'/>
        <div className='mt-6 flex flex-col items-center'> 
         <span className='font-[nunito] font-semibold text-sm leading-5 text-center text-[#666666]'>MTN campaign has been deleted</span>
        <div 
          onClick={goToCampaign}
          className='mt-12 font-[syne] w-[229px] font-bold text-xs leading-4 py-4 px-8 text-center bg-primary rounded-md cursor-pointer text-white'> 
          Go Back to campaign list
           </div>
        </div>
        </section>
      )}
      </Modal>
    </>
  );
};
export default DeleteMessage;
