import { InvestorInterface } from 'interfaces/investor';
import { PaintingInterface } from 'interfaces/painting';
import { GetQueryInterface } from 'interfaces';

export interface PurchaseInterface {
  id?: string;
  investor_id: string;
  painting_id: string;
  points: number;
  created_at?: any;
  updated_at?: any;

  investor?: InvestorInterface;
  painting?: PaintingInterface;
  _count?: {};
}

export interface PurchaseGetQueryInterface extends GetQueryInterface {
  id?: string;
  investor_id?: string;
  painting_id?: string;
}
