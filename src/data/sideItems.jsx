import { RiDashboard2Line } from "react-icons/ri";
import { MdOutlineCampaign } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

export const sideItems = [
    {
        name:'Overview',
        icon:RiDashboard2Line,
        path:'/'
    },
    {
        name:'Campaign',
        icon:MdOutlineCampaign,
        path:'/campaign'
    },
    {
        name:'Market Intelligence',
        icon:TbBulb,
        path:'/market'
    },
    {
        name:'Account Settings',
        icon:IoSettingsOutline,
        path:'/settings'
    },
]