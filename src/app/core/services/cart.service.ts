import { Injectable } from '@angular/core';
import { Order, SellOrder } from '../models/order';
import { BindingFlags } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  currentOrders: Array<Order> = [];
  currentSellOrders: Array<SellOrder> = [];
  constructor() { }

  addToCart(order: Order) {
    var itemavailable: boolean = false;
    this.currentOrders.forEach(element => {
      if ((element.item_id == order.item_id && element.invest_type == order.invest_type)) {
        element.amount = order.amount;
        itemavailable = true;
      }

    });
    if (!itemavailable) {
      this.currentOrders.push(order);
    }

  }

  removeFromCart(order: Order) {
    var tempCurrentOrders: Array<Order> = [];
    this.currentOrders.forEach(element => {
      if (!(element.item_id == order.item_id && element.invest_type == order.invest_type)) {
        tempCurrentOrders.push(element);
      }
    });
    this.currentOrders = tempCurrentOrders;
  }

  getCurrentCartOrders(): Array<Order> {
    return this.currentOrders;
  }

  setCurrentCartOrders(orders: Array<Order>): Array<Order> {
    return this.currentOrders = orders;
  }

  clearCart() {
    this.currentOrders = [];
    console.log('clear cart called')
  }
  getCurrentCartSize() {
    var size = 0;
    if (this.currentSellOrders != null) {
      size +=this.currentSellOrders.length;
    }
    if (this.currentOrders != null) {
      size +=this.currentOrders.length;
    }
    return size;
  }





  addToSellCart(order: SellOrder) {
    var itemavailable: boolean = false;
    this.currentSellOrders.forEach(element => {
      if ((element.item_id == order.item_id && element.invest_type == order.invest_type)) {
        element.remainingAmount = order.remainingAmount;
        element.buyBackPercentage = order.buyBackPercentage;
        element.declaredPercenatege = order.declaredPercenatege;
        itemavailable = true;
      }
    });
    if (!itemavailable) {
      this.currentSellOrders.push(order);
    }

  }

  removeFromSellCart(order: SellOrder) {
    var tempCurrentOrders: Array<SellOrder> = [];
    this.currentSellOrders.forEach(element => {
      if (!(element.item_id == order.item_id && element.invest_type == order.invest_type)) {
        tempCurrentOrders.push(element);
      }
    });
    this.currentSellOrders = tempCurrentOrders;
  }

  getCurrentSellCartOrders(): Array<SellOrder> {
    return this.currentSellOrders;
  }

  setCurrentSellCartOrders(orders: Array<SellOrder>): Array<SellOrder> {
    return this.currentSellOrders = orders;
  }

  clearSellCart() {
    this.currentSellOrders = [];
    console.log('clear cart called')
  }



}
