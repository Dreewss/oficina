// API Service for AutoParts Dashboard
// This file handles all communication with the backend

const API_BASE_URL = "https://your-api-url.com/api" // Replace with your actual API URL

// Helper function for making API requests
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}/${endpoint}`

  // Default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API request failed with status ${response.status}`)
    }

    // Parse JSON response
    return await response.json()
  } catch (error) {
    console.error(`Error in API request to ${endpoint}:`, error)
    throw error
  }
}

// Orders API
const ordersAPI = {
  getAll: () => fetchAPI("orders"),
  getById: (id) => fetchAPI(`orders/${id}`),
  create: (orderData) =>
    fetchAPI("orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    }),
  update: (id, orderData) =>
    fetchAPI(`orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderData),
    }),
  delete: (id) =>
    fetchAPI(`orders/${id}`, {
      method: "DELETE",
    }),
  updateStatus: (id, status) =>
    fetchAPI(`orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
}

// Vehicles API
const vehiclesAPI = {
  getAll: () => fetchAPI("vehicles"),
  getById: (id) => fetchAPI(`vehicles/${id}`),
  create: (vehicleData) =>
    fetchAPI("vehicles", {
      method: "POST",
      body: JSON.stringify(vehicleData),
    }),
  update: (id, vehicleData) =>
    fetchAPI(`vehicles/${id}`, {
      method: "PUT",
      body: JSON.stringify(vehicleData),
    }),
  delete: (id) =>
    fetchAPI(`vehicles/${id}`, {
      method: "DELETE",
    }),
  getHistory: (id) => fetchAPI(`vehicles/${id}/history`),
}

// Clients API
const clientsAPI = {
  getAll: () => fetchAPI("clients"),
  getById: (id) => fetchAPI(`clients/${id}`),
  create: (clientData) =>
    fetchAPI("clients", {
      method: "POST",
      body: JSON.stringify(clientData),
    }),
  update: (id, clientData) =>
    fetchAPI(`clients/${id}`, {
      method: "PUT",
      body: JSON.stringify(clientData),
    }),
  delete: (id) =>
    fetchAPI(`clients/${id}`, {
      method: "DELETE",
    }),
}

// Inventory API
const inventoryAPI = {
  getAll: () => fetchAPI("inventory"),
  getById: (id) => fetchAPI(`inventory/${id}`),
  create: (itemData) =>
    fetchAPI("inventory", {
      method: "POST",
      body: JSON.stringify(itemData),
    }),
  update: (id, itemData) =>
    fetchAPI(`inventory/${id}`, {
      method: "PUT",
      body: JSON.stringify(itemData),
    }),
  delete: (id) =>
    fetchAPI(`inventory/${id}`, {
      method: "DELETE",
    }),
}

// Dashboard API
const dashboardAPI = {
  getStats: () => fetchAPI("dashboard/stats"),
  getRecentOrders: () => fetchAPI("dashboard/recent-orders"),
}

// Export all API services
export const apiService = {
  orders: ordersAPI,
  vehicles: vehiclesAPI,
  clients: clientsAPI,
  inventory: inventoryAPI,
  dashboard: dashboardAPI,
}

