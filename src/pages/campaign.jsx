import React, { useState } from "react";
import styled from "styled-components";
import img from "../assets/search.svg";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdKeyboardBackspace, MdOutlineClose } from "react-icons/md";
import { Pagination } from "antd";
import view from "../assets/viewIcon.svg";
import edit from "../assets/editIcon.svg";
import del from "../assets/delIcon.svg";

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
  color: ${({ type }) => (type === "active" ? "#009918" : "#990000")};
`;

const Campaign = () => {
  const [campaign, setCampaign] = useState(false);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const data = [
    {
      date: new Date("2020-11-12"),
      name: "Infinion Tech",
      status: "active",
    },
    {
      date: new Date("2022-11-12"),
      name: "Infinion Tech",
      status: "inactive",
    },
  ];
  return (
    <section>
      {campaign ? (
        <Container className="h-[100%] w-[100%] flex flex-col">
          <Top className="mt-6">
            <h3 className="text-xl mb-0 leading-7 font-semibold font-[work-sans] text-primary">
              All Campaigns
            </h3>
            <section className="my-6 flex items-center justify-between">
              <Left>
                <div className="flex items-center gap-3">
                  <StatusWrapper>
                    <span className="font-[nunito] font-semibold text-sm leading-5 text-primary">
                      All
                    </span>
                    <span className="font-[nunito] font-semibold text-xs leading-5 text-primary">
                      (90)
                    </span>
                  </StatusWrapper>
                  <StatusWrapper>
                    <span className="font-[nunito] font-semibold text-sm leading-5 text-primary">
                      Inactive
                    </span>
                    <span className="font-[nunito] font-semibold text-xs leading-5 text-primary">
                      (90)
                    </span>
                  </StatusWrapper>
                  <StatusWrapper>
                    <span className="font-[nunito] font-semibold text-sm leading-5 text-primary">
                      Active
                    </span>
                    <span className="font-[nunito] font-semibold text-xs leading-5 text-primary">
                      (90)
                    </span>
                  </StatusWrapper>
                </div>
              </Left>
              <Right className="flex gap-3 items-center">
                <div className="border border-[#999999] rounded-md py-2 px-[10px] w-[200px] flex items-center gap-1">
                  <input
                    placeholder="Search..."
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
          <Bottom>
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
                  {data &&
                    data.map((item, i) => (
                      <tr className="border-b border-[#F1F1F1]" key={i}>
                        <td className="whitespace-nowrap px-[10px] py-3 font-medium text-[#666666] text-sm leading-5 font-[nunito]">
                          {i + 1}.
                        </td>
                        <td className="whitespace-nowrap px-[10px] py-3 font-medium text-[#666666] text-sm leading-5 font-[nunito]">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-[10px] py-3 font-medium text-[#666666] text-sm leading-5 font-[nunito]">
                          {formatDate(item.date)}
                        </td>
                        <td className="whitespace-nowrap px-[10px] py-3 font-medium  text-sm leading-5 font-[nunito]">
                          <Status type={item.status}>{item.status}</Status>
                        </td>
                        <td className="whitespace-nowrap px-[10px] py-3 font-medium text-[#666666] text-sm leading-5 font-[nunito]">
                          <div className="flex items-center gap-6">
                            <span>
                              <img
                                src={view}
                                alt="view icon"
                                className="cursor-pointer"
                              />
                            </span>
                            <span>
                              <img
                                src={edit}
                                alt="view icon"
                                className="cursor-pointer"
                              />
                            </span>
                            <span>
                              <img
                                src={del}
                                alt="view icon"
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
            <section className="mt-6 flex items-center justify-between">
              <div>
                <Pagination
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  defaultCurrent={1}
                  total={500}
                />
              </div>
              <div className="font-[nunito] font-medium text-sm leading-5 text-black">
                showing 10 of 40 results
              </div>
            </section>
          </Bottom>
        </Container>
      ) : (
        <Container className="h-[100%] w-[100%] flex flex-col">
          <Top className="mt-6">
            <div className="flex items-center gap-1">
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
                <span className="font-[nunito] font-medium text-sm leading-5 text-[#009918]">
                  Active
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
                    className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5"
                  />
                </div>
              </div>

              <div>
                <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                  Linked Keywords
                </label>
                <div className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent h-20">
                  <div className="w-[73px] py-[5px] px-[10px] flex items-center gap-1 rounded-md bg-primary text-white cursor-pointer">
                    <span className="font-[nunito] font-medium text-[10px] leading-[14px]">Fidelity</span>
                    <MdOutlineClose className="text-white"/>
                  </div>
                </div>
              </div>
            
              <div className="flex flex-col space-y-1">
                <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                Want to receive daily digest about the campaign?
                </label>
                <select className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5">
                  <option selected disabled>
                    Select
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                  Kindly select how often you want to receive daily digest
                </label>
                <select className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5">
                  <option selected disabled>
                    Select
                  </option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>


              <div className="pt-4 pb-4 flex items-center gap-4">
                <span className="border border-#990000 bg-[#990000] text-white rounded-md w-[196px] pb-2 pt-[10px] flex items-center justify-center cursor-pointer font-[nunito] font-semibold text-sm leading-5">
                Stop Campaign
                </span>
                <span className="border border-primary bg-white text-primary rounded-md w-[196px] pb-2 pt-[10px] flex items-center justify-center cursor-pointer font-[nunito] font-semibold text-sm leading-5">
                 Edit Information
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
