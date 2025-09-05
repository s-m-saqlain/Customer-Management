import { defineStore } from 'pinia';
import axios from 'axios'; 

export const useCustomersStore = defineStore('customers', {
  state: () => ({
    customers: [],
    loading: false,
    total: 0,
  }),
  actions: {
    async fetchCustomers() {
      this.loading = true;
      try {
        const mockData = [
          { id: '1000772_4', name: 'Lorem - Ipsum', location: 'Lakewood', color: 'green', initials: 'MA' },
          { id: '1030_4', name: 'Lorem - Ipsum', location: 'Brick', color: 'blue', initials: 'ZY' },
          { id: '1001864_4', name: 'Lorem - Ipsum', location: 'Oak Park', color: 'green', initials: 'MA' },
          { id: '1000772_4', name: 'Lorem - Ipsum', location: 'Basel', color: 'cyan', initials: 'ZY' },
          { id: '4210737_4', name: 'Lorem - Ipsum', location: 'Northumberland', color: 'teal', initials: 'IB' },
          { id: '2050086_4', name: 'Lorem - Ipsum', location: 'Myre', color: 'cyan', initials: 'WS' },
          { id: '8002883_4', name: 'Lorem - Ipsum', location: 'Harstad', color: 'emerald', initials: 'JH' },
        ];
        await new Promise(resolve => setTimeout(resolve, 500)); 
        this.customers = mockData;
        this.total = mockData.length; 
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});