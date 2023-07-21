import { PurchaseInterface } from 'interfaces/purchase';
import { GetQueryInterface } from 'interfaces';

export interface PaintingInterface {
  id?: string;
  name: string;
  artist: string;
  year: number;
  price: number;
  created_at?: any;
  updated_at?: any;
  purchase?: PurchaseInterface[];

  _count?: {
    purchase?: number;
  };
}

export interface PaintingGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  artist?: string;
}
