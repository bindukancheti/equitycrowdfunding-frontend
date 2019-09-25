  export interface UserInvestOnCampaignDetail {
        campaign_id: number;
        amount: number;
        is_active: boolean;
        start_date: string;
        end_date: string;
    }

    export interface UserInvestOnFundDetails {
        fund_id: number;
        amount: number;
        is_active: boolean;
        start_date: string;
        end_date: string;
    }


    export interface User {
        id: number;
        email: string;
        name: string;
        social_connect: string;
        description: string;
        role: number;
        company_name: string;
        password: string;
        annual_income: number;
        other_startup_investments: number;
        company_category?: any;
        userInvestOnCampaignDetails: UserInvestOnCampaignDetail[];
        userInvestOnFundDetails : UserInvestOnFundDetails[];
    }

