export interface Goal {
  id: string;
  name: string;
  areaId: string;
  type: 'do' | 'dont';
  dateType: 'none' | 'target' | 'exact';
  date: string;
  createdAt: Date;
}