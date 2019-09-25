
export interface CampaignDetail {
    id: number;
    name: string;
    fund_raiser_id: number;
    short_pitch: string;
    address: string;
    city: string;
    fund_required: number;
    description: string;
    is_approved: boolean;
    equity_stake: number;
    created_time: string;
    start_date: string;
    end_date: string;
    capitalRaisedIndividually : number;
    capitalRaisedInFunds :number;
    category: string;
    investors: number;
    number_of_fund: number;
}
