import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import qMark from "../assets/qmark.svg";
import { GoPlus } from "react-icons/go";
import { sideItems } from "../data/sideItems";
import { Link,useLocation,useNavigate } from "react-router-dom";

const Container = styled.div``;
const Top = styled.div``;
const Center = styled.div``;
const Bottom = styled.div``;

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleCampagn = () => { 
      navigate('/new-campaign')
    }
    
  return (
    <Container className="py-4">
      <Top className="flex items-center gap-2 pl-8 pr-12">
        <img src={logo} alt="logo image" />
        <h3>
          <span
          className="font-[Work-Sans] text-[2rem] font-bold leading-[2rem]"
            style={{
              backgroundImage: "linear-gradient(#247B7B, #247B7B)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Sc
          </span>
          <span
           className="font-[Work-Sans] text-[2rem] font-bold leading-[2rem]"
            style={{
              backgroundImage: "linear-gradient(#247B7B, #3B247B)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            r
          </span>
          <span
           className="font-[Work-Sans] text-[2rem] font-bold leading-[2rem]"
            style={{
              backgroundImage: "linear-gradient(#3B247B, #3B247B)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            utz
          </span>
        </h3>
      </Top>
      <Center className="mt-10 pl-8 pr-12"> 
      <div 
      onClick={handleCampagn}
      className="bg-primary rounded-[4px] p-[10px] flex justify-center shadow-md cursor-pointer"> 
      <div className="flex gap-2 items-center"> 
       <GoPlus  style={{width:'20px', height:'20px',color:'white'}}/>
      <h3 className="font-[nunito] font-semibold text-sm leading-5 text-white mb-0"> New Campaign</h3>
      </div>
      </div>
      <section className="mt-[2.5rem] space-y-3">
        {
            sideItems.map(item => (
            <Link 
            key={item.name} 
            to={item.path}
            className={`flex items-center gap-2 py-[10px] pl-8 cursor-pointer ${location.pathname === item.path ? 'bg-white text-primary rounded-tr-md rounded-br-md' : 'hover:text-primary hover:bg-white hover:rounded-tr-md hover:rounded-br-md'}`}
          > 
            <span>{<item.icon className={`${location.pathname === item.path ? 'text-primary' : ''}`} style={{width:'24px', height:'24px'}}/>}</span>
            <span className="leading-5 font-[nunito] font-semibold text-sm">{item.name}</span>
          </Link>
            ))
         }
         </section>
      </Center>
      <Bottom className="mt-10 px-8"> 
        <div className="rounded-md py-[25px] px-[25px] bg-white flex flex-col items-center"> 
        <div> 
         <img src={qMark} alt='question mark'/>
        </div>
            <div className="text-center my-1 text-sm">
               <span
              className="font-[nunito] font-semibold leading-5"
              style={{
              backgroundImage: "linear-gradient(#247B7B, #247B7B)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
               >Ne</span>
               <span
                className="font-[nunito] font-semibold leading-5"
              style={{
              backgroundImage: "linear-gradient(#247B7B, #3B247B)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
               >e</span>
               <span
                className="font-[nunito] font-semibold leading-5"
               style={{
              backgroundImage: "linear-gradient(#3B247B, #3B247B)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
               >d help?</span>
            </div>
        <div className="font-[nunito] font-semibold leading-4 text-[#666666] text-center my-1 text-xs"> 
             We’re readily available to provide help
        </div>
        <div className="font-[nunito] font-semibold leading-4 border border-primary rounded-md pt-2 pb-[10px] px-[10px] w-[98px] text-primary flex items-center justify-center mt-3 text-xs"> 
           Get help
        </div>
        </div>
      </Bottom>
    </Container>
  );
};

export default Sidebar;
