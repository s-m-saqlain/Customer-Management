<template>
  <div class="modal">
    <div class="modal-header">
      <div class="header-left">
        <button class="back-button" @click="handleBack">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="header-text">
          <div class="return-items">Return Items</div>
          <div class="select-customer">Select customer</div>
        </div>
      </div>
      <button class="close-button" @click="handleClose">×</button>
    </div>

    <div class="search-header">
      <div class="search-container">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          class="search-input"
          placeholder="Search for ID or name"
          v-model="searchQuery"
        />
      </div>
      <div class="results-header">{{ filteredCustomers.length }} of {{ store.total }}</div>
    </div>

    <div class="customer-list" v-if="!store.loading">
      <div
        class="customer-item"
        v-for="(customer, index) in filteredCustomers"
        :key="index"
      >
        <div :class="`avatar ${customer.color}`">{{ customer.initials }}</div>
        <div class="customer-info">
          <div class="customer-id">{{ customer.id }}</div>
          <div class="customer-name">{{ customer.name }}</div>
        </div>
        <div class="location">{{ customer.location }}</div>
        <button class="start-return-btn" @click="handleStartReturn(customer)">
          Start return
          <span class="arrow-icon">→</span>
        </button>
      </div>
    </div>
    <div v-else class="loading">Loading customers...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCustomersStore } from '../stores/customers';

const store = useCustomersStore();
const searchQuery = ref('');

onMounted(() => {
  store.fetchCustomers();
});

const filteredCustomers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return store.customers.filter(
    customer =>
      customer.id.toLowerCase().includes(query) ||
      customer.name.toLowerCase().includes(query)
  );
});

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.modal {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  max-height: calc(100vh - 64px); 
  overflow-y: auto; 
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 20px 24px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.back-button {
  background: none;
  border: 1px solid rgb(236, 234, 234);
  cursor: pointer;
  padding: 4px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button:hover {
  background-color: #f1f5f9;
}

.header-text {
  display: flex;
  flex-direction: column;
}

.return-items {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.select-customer {
  font-size: 18px;
  color: #0f172a;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: #64748b;
  font-size: 20px;
}

.close-button:hover {
  background-color: #f1f5f9;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px 16px;
  gap: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.search-container {
  position: relative;
  flex: 1;
}

.search-input {
  width: 55%; /* Adjusted to full width for better UX */
  padding: 12px 16px 12px 40px;
  border: none;
  border-radius: 28px;
  font-size: 14px;
  background-color: #f1f4f7;
}

@media (max-width: 1024px) {
  .search-input {
    width: 100%; 
    padding: 10px 14px 10px 36px; 
    font-size: 13px; 
    border-radius: 24px; 
  }
}

.search-input::placeholder {
  color: #94a3b8;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.results-header {
  font-size: 14px;
  color: #64748b;
  font-weight: bold;
  white-space: nowrap;
}

@media (max-width: 320px) {
  .results-header {
    display: none; /* Hide on mobile screens */
  }
}

.customer-item {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s;
}

.customer-item:hover {
  background-color: #f8fafc;
}

.customer-item:last-child {
  border-bottom: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: white;
  margin-right: 16px;
  flex-shrink: 0;
}

.avatar.green { background-color: #10b981; }
.avatar.cyan { background-color: #06b6d4; }
.avatar.blue { background-color: #3b82f6; }
.avatar.teal { background-color: #14b8a6; }
.avatar.emerald { background-color: #059669; }

.customer-info {
  flex: 1;
  min-width: 0;
}

.customer-id {
  font-size: 14px;
  color: #0f172a;
  font-weight: 500;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.customer-name {
  font-size: 14px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.location {
  font-size: 14px;
  color: #0f172a;
  font-weight: 500;
  margin-right: 16px;
  min-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0; 
}

.start-return-btn {
  /* background: none; */
  background-color: #f1f4f7;
  border: none;
  color: #156af1;
  font-size: 14px;
  font-weight:500;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.start-return-btn:hover {
  background-color: #eff6ff;
}

.arrow-icon {
  font-size: 12px;
}

.loading {
  padding: 24px;
  text-align: center;
  color: #64748b;
}

@media (max-width: 768px) {
  .modal {
    max-width: 90%;
  }
}
</style>