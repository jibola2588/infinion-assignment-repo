import React, { useState } from "react";
import styled from "styled-components";
import { Switch } from "antd";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router";
import { campaignService } from "../services/campaign_service";
import SuccessMessage from "../components/modals/successMessage";
// import {toast } from 'react-toastify';

const Container = styled.div``;
const Top = styled.div``;
const Bottom = styled.div``;

const NewCampaign = () => {
  const [checked, setchecked] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [text,setText] = useState('yes');
  const [name, setName] = useState('');
  const [des, setDesc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [linkText,setLinKText] = useState('');
  const [linkedArray,setLinkedArray] = useState([])
  const [digest,setDigest] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate()

  const onChange = (checked) => {
    if (checked) {
      setchecked(true);
    } else {
      setchecked(false);
    }
  };

  const handleLinkedText = (event) => { 
    if (event.key === 'Enter') {
    event.preventDefault();
    setLinkedArray(prevArray => [...prevArray, linkText]);
    setLinKText('');
  }

 }

  const deleteItem = (value) => { 
   const result = linkedArray.filter(item => item !== value)
   setLinkedArray([...result])
  }
  
  const convertDateToISO = (dateString) => {
    if (dateString) {
        const date = new Date(dateString);
        return date.toISOString();
      }
      return '';
  };

  const data = {
    "campaignName": name,
    "campaignDescription": des,
    "startDate": convertDateToISO(startDate),
    "endDate": convertDateToISO(endDate),
    "digestCampaign":checked ? true : false ,
    "linkedKeywords":linkedArray,
    "dailyDigest": digest
  }

  const handleSubmit = async() => { 
    setIsLoading(true)
    try{ 
    const  res = await campaignService.postCampaign(data);
    if(res){ 
     setIsLoading(false)
     setModalOpen(true)
     setText('Camapaign successfully created!')
    //  toast.success('campaign successfully created')
    //  console.log('res is here',res)
     setTimeout(() => { 
        navigate('/campaign')
     },1500)
     setName('');
     setDesc('')
     setStartDate('')
     setEndDate('')
    setLinKText('')
    setLinkedArray([])
    setDigest('')    
    }
    }catch(err){ 
        setIsLoading(false)
        console.log('err is here',err)
    }
  }

  const handleCancel = () => { 
    navigate('/')
  }



  return (
    <Container className="h-[100%] w-[100%] flex flex-col">
    {modalOpen && text &&
    <SuccessMessage 
     setModalOpen = {setModalOpen}
     text={text}
     modalOpen = {modalOpen}
    />}
      <Top className="mt-6">
        <h3 className="text-xl mb-0 leading-7 font-bold font-[work-sans] text-primary">
          Create New Campaign
        </h3>
      </Top>
      <Bottom>
        <section className="max-w-[684px] space-y-2 mt-2">
          <div className="space-y-1">
            <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
              Campaign Name<span className="text-red-500">*</span>
            </label>
            <input
              placeholder="e.g  The Future is now"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5"
            />
          </div>
          <div className="space-y-1">
            <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
              Campaign Description
            </label>
            <textarea
              row={50}
              col={50}
              value={des}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Please add a description to your campaign"
              className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4 justify-between">
            <div className="space-y-1">
              <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                Start Date<span className="text-red-500">*</span>
              </label>
              <input
                placeholder="dd/mm/yyy"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5"
              />
            </div>
            <div className="space-y-1">
              <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                End Date
              </label>
              <input
                placeholder="dd/mm/yyy"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5"
              />
            </div>
          </div>
          <div className="py-1 flex items-center justify-between">
            <span className="font-[nunito] font-medium text-sm leading-[18px]">
              Want to receive daily digest about the campaign?
            </span>
            <span>
              <Switch defaultChecked onChange={onChange} />
            </span>
          </div>
          {checked && (
            <section className="space-y-2">
              <div className="space-y-1">
                <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                  Linked Keywords<span className="text-red-500">*</span>
                </label>
                {/* <textarea
                  row={30}
                  col={50}
                  placeholder="To add keywords, type your keyword and press enter"
                  className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5"
                ></textarea> */}
                <div className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent">
                <input 
                  value={linkText}
                   placeholder="To add keywords, type your keyword and press enter"
                    className="w-full pb-4 outline-none border-none"
                    onChange={e => setLinKText(e.target.value)}
                    onKeyDown={handleLinkedText}
                />
                <div className="flex gap-1 items-center flex-wrap"> 
                   { 
                    linkedArray.length >= 1 && linkedArray.map((item,i) => ( 
                    <div className="w-[100px] break-words py-[5px] px-[10px] flex items-center justify-between rounded-md bg-primary text-white cursor-pointer" key={i}>
                    <span className="font-[nunito] font-medium text-[10px] leading-[14px]">{item}</span>
                    <MdOutlineClose className="text-white" onClick={ () => deleteItem(item)}/>
                  </div>
                    ))
                   }
                </div>

                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                  Kindly select how often you want to receive daily digest
                </label>
                <select
                value={digest}
                onChange={e => setDigest(e.target.value)}
                 className="border border-[#999999] rounded-md p-[10px] w-[155px] bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5">
                  <option selected disabled>
                    Select
                  </option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </section>
          )}
          <div className="pt-4 pb-4 flex items-center gap-4">
            <span
            onClick={handleCancel}
             className="border border-primary bg-white text-primary rounded-md w-[196px] pb-2 pt-[10px] flex items-center justify-center cursor-pointer font-[nunito] font-semibold text-sm leading-5">
              Cancel
            </span>
            <span 
            onClick={handleSubmit}
            className="bg-primary text-white rounded-md w-[196px] pb-2 pt-[10px] flex items-center justify-center cursor-pointer font-[nunito] font-semibold text-sm leading-5 shadow-emerald-50">
              {isLoading ? 'loading ...' : 'Create Campaign'}
            </span>
          </div>
        </section>
      </Bottom>
    </Container>
  );
};

export default NewCampaign;
