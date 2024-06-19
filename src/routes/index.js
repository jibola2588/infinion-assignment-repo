import {lazy} from 'react'

const Overview = lazy(() => import('../pages/overview'));
const Dashboard = lazy(() => import('../pages/dashboardLayout'))
const Campaign = lazy(() => import('../pages/campaign'))
const NewCampaign = lazy(() => import('../pages/newCampaign'))
const Market = lazy(() => import('../pages/market'))
const Settings = lazy(() => import('../pages/settings'))

export const routes = [
    {
        path: '/',
        element:Dashboard,
        children:[
            { 
                path:'',
                element: Overview
            },
            { 
                path:'campaign',
                element:Campaign
            },
            { 
                path:'new-campaign',
                element:NewCampaign
            },
            { 
                path:'market',
                element:Market
            },
            { 
                path:'settings',
                element:Settings
            }
            
        ]
    },
];