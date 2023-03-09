import { Controller, Get, Delete, Put, Body, Req, Post, UseGuards, HttpStatus } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';

@Controller('profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  @Get()
  async findUserCart() {
    console.log('### RUN: findUserCart()');

    const cart = await this.cartService.findOrCreateByUserId();

    console.log('##findUserCart cart', cart);
    console.log('##findUserCart cart.items', cart?.items);

    const items = cart?.items;

    const data = items.map(item=>({
      product: {
        price: item.product.price,
        title: item.product.title,
        description: item.product.description,
        id: item.product.product_id
      },
      count: item.count
    }))

    console.log('findUserCart data', data);
    return data;
  }

  @Put()
  async updateUserCart(@Body() body) {
    const cart = await this.cartService.updateByUserId(body)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: calculateCartTotal(cart),
      }
    }
  }

  @Delete()
  async clearUserCart() {
    await this.cartService.removeByUserId();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    }
  }

  @Post('checkout')
  async checkout (@Body() body) {
    const cart = await this.cartService.findByUserId();

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;

      return {
        statusCode,
        message: 'Cart is empty',
      }
    }

    const { id: cartId, items } = cart;
    const total = calculateCartTotal(cart);
    const order = this.orderService.create({
      ...body, // TODO: validate and pick only necessary data
      cartId,
      items,
      total,
    });
    await this.cartService.removeByUserId();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order }
    }
  }
}