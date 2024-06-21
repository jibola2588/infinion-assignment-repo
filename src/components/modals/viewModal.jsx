import React from "react";
import moment from "moment";
import { Modal } from "antd";
import { MdKeyboardBackspace } from "react-icons/md";

const ViewCampaign = ({ modalOpen, onClose, item }) => {

  const goBack = () => {
    onClose();
  };

  const formatDate = (item) => {
    const date = moment(item);
    return date.format('DD/MM/YYYY');
  };

  return (
    <>
      <Modal centered open={modalOpen} footer={null} className="custom-modal">
        <section className="flex flex-col space-y-4">
        <div 
            onClick={goBack}
            className="flex items-center gap-1 cursor-pointer mb-10">
              <MdKeyboardBackspace style={{ width: "24px", height: "24px" }} />
              <span className="font-[nunito] font-semibold text-base leading-6 text-[#33333]">
                Back
              </span>
            </div>

          <div className="flex items-center justify-between">
            <span className="pr-2 font-[nunito] font-medium text-sm leading-5 text-[#000000]">
              Campaign Status
            </span>
            <span
              className={`font-[nunito] font-medium text-sm leading-5 ${
                item.campaignStatus == "Active"
                  ? "text-[#009918]"
                  : "text-[#990000]"
              }`}
            >
              {item.campaignStatus}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[nunito] font-medium text-sm leading-5 text-[#000000]">
              Campaign Name
            </span>
            <span className="font-[nunito] font-medium text-sm leading-5 text-[#000000]">
              {item.campaignName}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[nunito] font-medium text-sm leading-5 text-[#000000]">
            Start Date
            </span>
            <span className="font-[nunito] font-medium text-sm leading-5 text-[#000000]">
              {formatDate(item.startDate)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[nunito] font-medium text-sm leading-5 text-[#000000]">
              End Date
            </span>
            <span className="font-[nunito] font-medium text-sm leading-5 text-[#000000]">
             {formatDate(item.endDate)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[nunito] font-medium text-sm leading-5 text-[#000000]">
              Digest Campaign
            </span>
            <span className="font-[nunito] font-medium text-sm leading-5 text-[#000000]">
             {item.digestCampaign}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[nunito] font-medium text-sm leading-5 text-[#000000]">
              Digest 
            </span>
            <span className="font-[nunito] font-medium text-sm leading-5 text-[#000000]">
             {item.dailyDigest}
            </span>
          </div>
          <div className="flex items-start justify-between">
            <span className="font-[nunito] font-medium text-sm leading-5 text-[#000000]">
              Linked Keyword
            </span>
            <div className="space-y-2">
            {item.linkedKeywords && item.linkedKeywords.map((item,i) => ( 
                  <div className="w-[73px] py-[5px] px-[10px] flex items-center justify-between rounded-md bg-primary text-white cursor-pointer" key={i}>
                    <span className="font-[nunito] font-bold text-[10px] leading-[14px]">{item}</span>
                  </div>
                  ))}
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
};
export default ViewCampaign;
