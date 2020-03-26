import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order';

@Pipe({
  name: 'orderPrice'
})
export class OrderPricePipe implements PipeTransform {

  transform(order: Order, ...args: any[]): any {
    const selectedColors = [order.c, order.m, order.y, order.k, order.pantone]
        .reduce(( accumulator, currentValue ) => {
          return (currentValue === true || currentValue === 1) ? accumulator + 1 : accumulator;
        } , 0);
    const platePrice = order.storage.plate.user_price ? order.storage.plate.user_price : order.storage.plate.price;
    return order.file.pages * parseInt(platePrice, 10) * selectedColors;
  }

}
