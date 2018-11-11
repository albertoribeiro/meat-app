import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart-service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs";
import {HttpClient} from '@angular/common/http'
import { Order } from "./order.model";
import {map} from 'rxjs/operators'
import {MEAT_API } from '../app.api'


@Injectable()

export class OrderService{
    constructor (private cartService: ShoppingCartService, 
                 private http : HttpClient){}
    cartitems(): CartItem[]{
        return this.cartService.items
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }
    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    } 
    remove(item:CartItem){
        this.cartService.removeItem(item)
    }
    itemsValue(): number{
        return this.cartService.total()
    }

    checkOrder(order: Order): Observable<string>{
        return this.http.post<Order>(`${MEAT_API}/orders`,order)
                        .pipe(map(order => order.id))
    }

    clear()
    {
        this.cartService.clear()
    }  
}