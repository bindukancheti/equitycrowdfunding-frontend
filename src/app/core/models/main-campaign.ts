import {CampaignFandQ} from './campaign-fand-q'
import {CampaignTeam} from  './campaign-team'
import {CampaignFinancialReport} from './campaign-financial-report'
import {CampaignDetail} from './campaign-detail'

export interface MainCampaign {
    campaignFandQs: CampaignFandQ[];
    campaignTeams: CampaignTeam[];
    campaignFinancialReports: CampaignFinancialReport[];
    campaignDetail: CampaignDetail;
    campaignMedias: CampaignMedia[];
}

export interface CampaignMedia {
    file_location: string;
}



