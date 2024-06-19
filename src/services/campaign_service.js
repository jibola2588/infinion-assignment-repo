import { serviceInstance } from "./axios_service";


export const campaignService = {
    getAllCampaign: () =>
      serviceInstance
        .get(`/Campaign`)
        .then(({ data, status }) => ({
          ...data,
          status,
        }))

    }