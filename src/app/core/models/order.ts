export interface Order {
        item_id: number;
        item_name : string;
        user_id: number;
        amount: number;
        invest_type: string;
  }


  export interface SellOrder {
      item_id: number;
      buyBackPercentage :number;
      declaredPercenatege:number;
      item_name : string;
      user_id: number;
      remainingAmount: number;
      invest_type: string;
}


