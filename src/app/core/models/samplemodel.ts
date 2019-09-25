export interface CampaignFandQ {
    question: string;
    answer: string;
}

export interface CampaignTeam {
    name: string;
    profile: string;
    email_id: string;
}

export interface CampaignFinancialReport {
    year: number;
    value: string;
    report: string;
}

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
}

export interface MainCampaign {
    campaignFandQs: CampaignFandQ[];
    campaignTeams: CampaignTeam[];
    financialReportofCampaigns: CampaignFinancialReport[];
    campaignDetail: CampaignDetail;
}