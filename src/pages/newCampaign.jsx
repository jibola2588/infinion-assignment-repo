import React, { useState } from "react";
import styled from "styled-components";
import { Switch } from "antd";

const Container = styled.div``;
const Top = styled.div``;
const Bottom = styled.div``;

const NewCampaign = () => {
  const [checked, setchecked] = useState(true);

  const onChange = (checked) => {
    if (checked) {
      setchecked(true);
    } else {
      setchecked(false);
    }
  };

  return (
    <Container className="h-[100%] w-[100%] flex flex-col">
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
                <textarea
                  row={30}
                  col={50}
                  placeholder="To add keywords, type your keyword and press enter"
                  className="border border-[#999999] rounded-md p-[10px] w-full bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5"
                ></textarea>
              </div>
              <div className="flex flex-col space-y-1">
                <label className="font-[nunito] font-medium text-sm leading-5 text-[#666666]">
                  Kindly select how often you want to receive daily digest
                </label>
                <select className="border border-[#999999] rounded-md p-[10px] w-[155px] bg-transparent text-[#999999] font-[nunito] font-medium text-sm leading-5">
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
            <span className="border border-primary bg-white text-primary rounded-md w-[196px] pb-2 pt-[10px] flex items-center justify-center cursor-pointer font-[nunito] font-semibold text-sm leading-5">
              Cancel
            </span>
            <span className="bg-primary text-white rounded-md w-[196px] pb-2 pt-[10px] flex items-center justify-center cursor-pointer font-[nunito] font-semibold text-sm leading-5 shadow-emerald-50">
              Create Campaign
            </span>
          </div>
        </section>
      </Bottom>
    </Container>
  );
};

export default NewCampaign;
