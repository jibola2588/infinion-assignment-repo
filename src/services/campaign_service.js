import { serviceInstance } from "./axios_service";


export const campaignService = {
    getAllCampaign: () =>
       serviceInstance
        .get(`/Campaign`)
        .then(({ data, status }) => ({
          data,
          status,
        })),

    postCampaign: (data) =>
       serviceInstance
        .post(`/Campaign`,data)
        .then(({ data, status }) => ({
          data,
          status,
        })),

    editCampaign: (data,id) =>
       serviceInstance
        .put(`/Campaign/${id}`,data)
        .then(({ data, status }) => ({
          data,
          status,
        })),

    deleteCampaign: (id) =>
       serviceInstance
        .delete(`/Campaign/${id}`)
        .then(({ data, status }) => ({
          data,
          status,
        }))

    }