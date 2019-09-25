import {CampaignDetail} from './campaign-detail'
import {FundFandQ} from './fund-fand-q'
import {FundPortfolioManager} from './fund-portfolio-manager'
import { MainCampaign } from './main-campaign'

export interface FundDetail {
    id: number;
    fund_name: string;
    category: string;
    fund_manager_id: number;
    start_date: string;
    end_date: string;
    short_description: string;
    long_description: string;
    prospectus_location: string;
    fund_termination_date: string;
    minimum_investment: number;
    maximum_investment: number;
    capitalRaisedInThisFund: number;
    fundCampaignsList: MainCampaign[];
    fundFandQs: FundFandQ[];
    fundMedias: FundMedia[];
    fundPortfolioManager: FundPortfolioManager[];
    investors: number;
}


export interface FundMedia {
    file_location: string;
}