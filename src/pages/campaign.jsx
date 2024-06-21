import React, { useState,useEffect } from "react";
import styled from "styled-components";
import img from "../assets/search.svg";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdKeyboardBackspace, MdOutlineClose } from "react-icons/md";
import { Pagination } from "antd";
import view from "../assets/viewIcon.svg";
import edit from "../assets/editIcon.svg";
import del from "../assets/delIcon.svg";
import { campaignService } from "../services/campaign_service";
import DeleteMessage from "../components/modals/deleteModal";
import imgPlaceholder from '../assets/empty-place-holder.svg';
import SuccessMessage from "../components/modals/successMessage";
import {toast } from 'react-toastify';
import moment from "moment";

const Container = styled.div``;
const Top = styled.div``;
const StatusWrapper = styled.div`
  border: 1px solid #2a9d8f;
  border-radius: 4px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #2a9d8f;
  cursor: pointer;
`;
const Bottom = styled.div``;
const Left = styled.div``;
const Right = styled.div``;
const Status = styled.div`
  font-family: "Syne";
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: ${({ type }) => (type === "Active" ? "#009918" : "#990000")};
`;

const Campaign = () => {

  const [campaign, setCampaign] = useState(true);
  const [campaignData,setCampaignData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [active,setActive] = useState(0);
  const [inactive,setInActive] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [pageSize,setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignObj,setCampaignObj] = useState({})
  const [isLoading,setIsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setEditModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [id,setId] = useState('')

  const [name, setName] = useState('');
  const [des, setDesc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [linkText,setLinKText] = useState('');
  const [linkedArray,setLinkedArray] = useState([])
  const [digest,setDigest] = useState('')
  const [digestValue,setDigestValue] = useState('')

  const startIndex = (currentPage - 1) * pageSize;
 const endIndex = startIndex + pageSize;
 const currentData = filteredData.slice(startIndex, endIndex);

  const goBack = () => {
    setCampaign(true)
  }

  const onShowSizeChange = (currentPage, pageSize) => {
    console.log(currentPage, pageSize);
    setCurrentPage(currentPage);
    setPageSize(pageSize);
  };

  const formatDate = (item) => {
    const date = moment(item);
    return date.format('DD/MM/YYYY');
  };

  const getCampaign = async () => { 
   try {
    const  res = await campaignService.getAllCampaign();
    if(res.status == 200){ 
      toast.success('campaign fetched successfully');
      // console.log('res is here',res.data)
      const data = res.data
      setCampaignData(res.data);
      setFilteredData(data);
      setActive(res.data.filter(item => { 
        return item.campaignStatus === 'Active'
      }))
      setInActive(res.data.filter(item => { 
        return item.campaignStatus === 'Inactive'
      }))
    }
  } catch (error) {
    console.log('error is here',error);
    toast.danger('Request failed');
  }
  }

  const filterData = (status) => {
    let data = campaignData;

    if (status === 'Active') {
      data = campaignData.filter(item => item.campaignStatus === 'Active');
    } else if (status === 'Inactive') {
      data = campaignData.filter(item => item.campaignStatus === 'Inactive');
    }

    // if (searchQuery) {
    //   data = data.filter(item => item.campaignName.toLowerCase().includes(searchQuery.toLowerCase()));
    // }

    setFilteredData(data);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    let data = campaignData;

    if (query) {
      data = data.filter(item => item.campaignName.toLowerCase().includes(query.toLowerCase()));
    }

    setFilteredData(data);
    setCurrentPage(1);
  };

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getCampaign();
  }, []);

  const viewCampaign = (item) => { 

    setCampaign(false)
    setCampaignObj(item)
    setLinkedArray([...item.linkedKeywords])
    setName(item.campaignName)
    setStartDate(formatViewDate(item.startDate))
    setEndDate(formatViewDate(item.endDate))
    setDigestValue(item.digestCampaign)
    setDigest(item.dailyDigest)
    setDesc(item.campaignDescription)
  }

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

 const formatViewDate = (dateString) => {
  const date = moment(dateString);
  return date.format('YYYY-MM-DD');
};

const stopCampaign = (data) => { 
  setModalOpen(true) 
  setId(data.id)
}

const convertDateToISO = (dateString) => {
  if (dateString) {
      const date = new Date(dateString);
      return date.toISOString();
    }
    return '';
};

const data = {
  "id": campaignObj.id,
  "campaignName": name,
  "startDate": convertDateToISO(startDate),
  "endDate": convertDateToISO(endDate),
  "digestCampaign":digestValue == 'Yes' ? true : false,
  "linkedKeywords":linkedArray,
  "dailyDigest": digest,
  "campaignDescription":des
}

const handleSubmit = async() => { 
  setIsLoading(true)
    try{ 
    const res = await campaignService.editCampaign(data,campaignObj.id);
    if(res){ 
     setIsLoading(false)
     setEditModalOpen(true);
     setText("Camapaign successfully Edited!");
     setName('');
     setStartDate('')
     setEndDate('')
    setLinKText('')
    setLinkedArray([])
    setDigest('')    
    setDigestValue('')
    }
    }catch(err){ 
        setIsLoading(false)
        // console.log('err is here',err)
    }
}

  return (
    <section>
      {campaign ? (
        <Container className="h-[100%] w-[100%] flex flex-col">
        {modalOpen && <DeleteMessage 
           setModalOpen = {setModalOpen}
           modalOpen = {modalOpen}
           id={id}
           onClose={() => {
            goBack();
            setModalOpen(false)
            getCampaign();
            }}
        />}
          <Top className="mt-6">
            <h3 className="text-xl mb-0 leading-7 font-semibold font-[work-sans] text-primary">
              All Campaigns
            </h3>
            <section className="my-6 flex items-center justify-between">
              <Left>
                <div className="flex items-center gap-3">
                  <StatusWrapper onClick={() => filterData('All')}>
                    <span className="font-[nunito] font-semibold text-sm leading-5 text-primary">
                      All
                    </span>
                    <span className="font-[nunito] font-semibold text-xs leading-5 text-primary">
                    ({ campaignData && campaignData.length})
                    </span>
                  </StatusWrapper>
                  <StatusWrapper onClick={() => filterData('Inactive')}>
                    <span className="font-[nunito] font-semibold text-sm leading-5 text-primary">
                      Inactive
                    </span>
                    <span className="font-[nunito] font-semibold text-xs leading-5 text-primary">
                      ({ inactive && inactive.length})
                    </span>
                  </StatusWrapper>
                  <StatusWrapper onClick={() => filterData('Active')}>
                    <span className="font-[nunito] font-semibold text-sm leading-5 text-primary">
                      Active
                    </span>
                    <span className="font-[nunito] font-semibold text-xs leading-5 text-primary">
                    ({ active && active.length})
                    </span>
                  </StatusWrapper>
                </div>
              </Left>
              <Right className="flex gap-3 items-center">
                <div className="border border-[#999999] rounded-md py-2 px-[10px] w-[200px] flex items-center gap-1">
                  <input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="bg-transparent border-none outline-none font-[nunito] text-xs leading-4 font-semibold text-[#666666] flex-1"
                  />
                  <img alt="image" src={img} />
                </div>
                <div className="border border-[#999999] rounded-md py-2 px-[10px] w-[200px] flex items-center gap-1">
                  <span className="font-[nunito] text-xs leading-4 font-semibold text-[#666666] flex-1">
                    Date filter
                  </span>
                  <IoChevronDownOutline />
                </div>
              </Right>
            </section>
          </Top>
          {currentData.length > 0 ? <Bottom>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-sm">
                <thead className="text-left bg-[#F0F4F4] rounded-md">
                  <tr>
                    <th className="whitespace-nowrap px-[10px] py-3 font-bold text-[#455454]font-[work-sans]  text-xs leading-4  rounded-tl-md rounded-bl-md ">
                      S/N
                    </th>
                    <th className="whitespace-nowrap px-[10px] py-3 font-bold text-[#455454]font-[nunito]  text-xs leading-4 ">
                      Campaign Name
                    </th>
                    <th className="whitespace-nowrap px-[10px] py-3 font-bold text-[#455454]font-[nunito]  text-xs leading-4 ">
                      Start Date
                    </th>
                    <th className="whitespace-nowrap px-[10px] py-3 font-bold text-[#455454]font-[nunito]  text-xs leading-4 ">
                      Status
                    </th>
                    <th className="whitespace-nowrap px-[10px] py-3 font-bold text-[#455454]font-[nunito]  text-xs leading-4  rounded-tr-md rounded-br-md">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentData &&
                    currentData.map((item, i) => (
                      <tr className="border-b border-[#F1F1F1]" key={i}>
                        <td className="whitespace-nowrap px-[10px] py-3 font-medium text-[#666666] text-sm leading-5 font-[nunito]">
                          {i + 1}.
                        </td>
                        <td className="whitespace-nowrap px-[10px] py-3 font-medium text-[#666666] text-sm leading-5 font-[nunito]">
                          {item.campaignName}
                        </td>
                        <td className="whitespace-nowrap px-[10px] py-3 font-medium text-[#666666] text-sm leading-5 font-[nunito]">
                          {formatDate(item.startDate)}
                        </td>
                        <td className="whitespace-nowrap px-[10px] py-3 font-medium  text-sm leading-5 font-[nunito]">
                          <Status type={item.campaignStatus}>{item.campaignStatus}</Status>
                        </td>
                        <td className="whitespace-nowrap px-[10px] py-3 font-medium text-[#666666] text-sm leading-5 font-[nunito]">
                          <div className="flex items-center gap-6">
                            <span onClick={() => viewCampaign(item)}>
                              <img
                                src={view}
                                alt="view icon"
                                className="cursor-pointer"
                              />
                            </span>
                            <span>
                              <img
                              onClick={() => viewCampaign(item)}
                                src={edit}
                                alt="edit icon"
                                className="cursor-pointer"
                              />
                            </span>
                            <span>
                              <img
                              onClick={ () => stopCampaign(item)}
                                src={del}
                                alt="delete icon"
                                className="cursor-pointer"
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
           {filteredData.length > 0 && <section className="mt-6 flex items-center justify-between mb-4">
              <div>
              <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={1}
              current={currentPage}
              pageSize={pageSize}
              total={filteredData.length}
              onChange={handlePaginationChange}
            />
              </div>
              <div className="font-[nunito] font-medium text-sm leading-5 text-black">
                showing {currentPage} of {filteredData.length} results
              </div>
            </section>}
          </Bottom> : 
          (  
            
            <div className="space-y-6 flex flex-col items-center"> 
              <img src={imgPlaceholder} alt='place holder'/>

              <div className="mt-4 text-center font-[nunito] font-semibold">Data is empty </div> 
            </div>
          )
          }
        </Container>
      ) : (
        <Container className="h-[100%] w-[100%] flex flex-col">
        {modalOpen && <DeleteMessage 
           setModalOpen = {setModalOpen}
           modalOpen = {modalOpen}
           id={id}
           onClose={() => {
            goBack();
            setModalOpen(false)
            getCampaign();
            }}
        />}
        {modalEditOpen && text && (
        <SuccessMessage
          text={text}
          modalOpen={modalEditOpen}
          onClose = {() => {
            setCampaign(true);
            setEditModalOpen(false);
            getCampaign();
            }}
        />
      )}
          <Top className="mt-6">
            <div 
            onClick={goBack}
            className="flex items-center gap-1 cursor-pointer">
              <MdKeyboardBackspace style={{ width: "24px", height: "24px" }} />
              <span className="font-[nunito] font-semibold text-base leading-6 text-[#33333]">
                Back
              </span>
            </div>
          
          </Top>
          <Bottom>
            <section className="max-w-[684px] space-y-3 mt-2">
            <div className="my-4 flex items-center justify-between">
              <h3 className="text-xl mb-0 leading-7 font-bold font-[work-sans] text-primary">
                Create New Campaign
              </h3>
              <div className="bg-[#EDF0F0] rounded-md py-2 px-4 gap-4 flex items-center">
                <span className="pr-2 border-r border-[#999999] font-[nunito] font-medium text-sm leading-5 text-[#000000]">
                  Campaign Status
                </span>
                <span className={`font-[nunito] font-medium text-sm leading-5 ${ campaignObj.campaignStatus == 'Active' ? 'text-[#009918]' : 'text-[#990000]'}`}>
                  {campaignObj.campaignStatus}
                </span>
              </div>
            </div>
              <div className="space-y-1">
                <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                  Campaign Name
                </label>
                <input
                  placeholder="e.g  The Future is now"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 justify-between">
                <div className="space-y-1">
                  <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                    Start Date
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

              <div>
                <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                  Linked Keywords
                </label>
                <div className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent flex flex-wrap gap-1">
                <input 
                  value={linkText}
                   placeholder="To add keywords, type your keyword and press enter"
                    className="w-full pb-4 outline-none border-none"
                    onChange={e => setLinKText(e.target.value)}
                    onKeyDown={handleLinkedText}
                />
                {linkedArray && linkedArray.map((item,i) => ( 
                  <div className="w-[73px] py-[5px] px-[10px] flex items-center justify-between rounded-md bg-primary text-white cursor-pointer" key={i}>
                    <span className="font-[nunito] font-medium text-[10px] leading-[14px]">{item}</span>
                    <MdOutlineClose className="text-white"  onClick={() => deleteItem(item)}/>
                  </div>
                  ))}
                </div>
              </div>
            
              <div className="flex flex-col space-y-1">
                <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                Want to receive daily digest about the campaign?
                </label>
                <select 
                value={digestValue}
                onChange={e => setDigestValue(e.target.value)}
                className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5">
                  <option selected disabled>
                    Select
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                  Kindly select how often you want to receive daily digest
                </label>
                <select
                value={digest}
                onChange={e => setDigest(e.target.value)}
                 className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5">
                  <option selected disabled>
                    Select
                  </option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>


              <div className="pt-4 pb-4 flex items-center gap-4">
                <span
                 onClick={() => stopCampaign(campaignObj)}
                 className="border border-#990000 bg-[#990000] text-white rounded-md w-[196px] pb-2 pt-[10px] flex items-center justify-center cursor-pointer font-[nunito] font-semibold text-sm leading-5">
                Stop Campaign
                </span>
                <span 
                  onClick={handleSubmit}
                className="border border-primary bg-white text-primary rounded-md w-[196px] pb-2 pt-[10px] flex items-center justify-center cursor-pointer font-[nunito] font-semibold text-sm leading-5">
                {isLoading ? 'loading ...' : 'Edit Information'}
                </span>
              </div>
            </section>
          </Bottom>
        </Container>
      )}
    </section>
  );
};

export default Campaign;
