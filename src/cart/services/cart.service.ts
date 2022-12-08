import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-postgres';
import { Client } from 'pg';

import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(
      @InjectClient()
      private readonly pg: Client
  ) {}

  async findByUserId(): Promise<Cart> {
    console.log('+++findByUserId');
    const QUERY_CARTS_SELECT = 'SELECT * FROM carts';
    const QUERY_CARTS_ITEMS = 'SELECT * FROM cart_items WHERE cart_id=$1';

    const carts = await this.pg.query(QUERY_CARTS_SELECT);

    const id = carts.rows?.[0]?.id;

    if (!id) return null;

    const cartItems = await this.pg.query( QUERY_CARTS_ITEMS,[id]);

    const items = cartItems.rows.map(item => ({
      product: { ...item },
      count: item.count
    }));

    return { id,items };
  }

  async createByUserId(): Promise<Cart> {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const today = `${yyyy}-${mm}-${dd}`;

    const QUERY_INSERT = `INSERT INTO carts (created_at, updated_at) VALUES ($1, $2) RETURNING *`;

    const carts = await this.pg.query(QUERY_INSERT, [today, today]);

    return { id: carts.rows[0].id, items: [] };
  }

  async findOrCreateByUserId(): Promise<Cart> {
    return await this.findByUserId();
  }

  async updateByUserId({ product, count }: any): Promise<Cart> {
    const { id }: Cart = await this.findOrCreateByUserId();
    console.log('***UPDATE');

    const QUERY_CARTS_ITEMS = 'SELECT * FROM cart_items WHERE product_id=$1 AND cart_id=$2';
    const QUERY_CARTS_UPDATE = 'UPDATE cart_items SET count=$3 WHERE product_id=$1 AND cart_id=$2';
    const QUERY_CARTS = 'SELECT * FROM cart_items';

    const existing = await this.pg.query( QUERY_CARTS_ITEMS, [product.id, id] );

    await this.pg.query(QUERY_CARTS_UPDATE, [product.id, id, count] );

    const cartItems = await this.pg.query(QUERY_CARTS);

    const items = cartItems.rows.map(cartItem => ({
      product: { ...cartItem },
      count: cartItem.count,
    }));

    return { id, items };
  }

  async removeByUserId(): Promise<void> {
    await this.pg.query(`DELETE FROM carts`);
  }
}