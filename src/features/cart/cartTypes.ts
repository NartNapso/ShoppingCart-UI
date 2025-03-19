export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    category: string;
  }
  
  export interface CartState {
    categories: {
      [key: string]: CartItem[];
    };
  }
  