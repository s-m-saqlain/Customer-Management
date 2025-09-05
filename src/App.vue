<template>
  <div class="app-container">
    <SelectCustomerModal />
  </div>
</template>

<script setup>
import SelectCustomerModal from "./components/SelectCustomerModal.vue";
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: rgba(0, 0, 0, 0.5);
}
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  /* padding-bottom: 20px; */
}
</style>
