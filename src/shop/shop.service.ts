import { Injectable } from '@nestjs/common';
import ShopRepository from './shop.repository';

@Injectable()
export default class ShopService {
  constructor(private repository: ShopRepository) {}
}
