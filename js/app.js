// Example of how to use the API service in your application

// Import the API service
import { apiService } from "./api-service.js"

// Example of loading data from the backend
async function loadDataFromBackend() {
  try {
    // Show loading indicator
    showLoading(true)

    // Fetch dashboard stats
    const stats = await apiService.dashboard.getStats()
    updateDashboardStats(stats)

    // Fetch recent orders
    const recentOrders = await apiService.dashboard.getRecentOrders()
    displayRecentOrders(recentOrders)

    // Fetch all orders
    const orders = await apiService.orders.getAll()
    storeOrders(orders)
    displayOrders(orders)

    // Fetch vehicles
    const vehicles = await apiService.vehicles.getAll()
    storeVehicles(vehicles)
    displayVehicles(vehicles)

    // Fetch clients
    const clients = await apiService.clients.getAll()
    storeClients(clients)
    displayClients(clients)

    // Fetch inventory
    const inventory = await apiService.inventory.getAll()
    storeInventory(inventory)
    displayInventory(inventory)

    // Hide loading indicator
    showLoading(false)
  } catch (error) {
    // Handle errors
    showError("Failed to load data from the server. Please try again later.")
    console.error("Error loading data:", error)
    showLoading(false)
  }
}

// Example of adding a new order
async function addOrderToBackend(orderData) {
  try {
    showLoading(true)

    // Send the new order to the backend
    const newOrder = await apiService.orders.create(orderData)

    // Update the local data
    orders.push(newOrder)
    displayOrders(orders)

    // Show success message
    showSuccess("Order added successfully")

    // Close the popup
    closePopup("popup-nova-ordem")
    showLoading(false)
  } catch (error) {
    showError("Failed to add order. Please try again.")
    console.error("Error adding order:", error)
    showLoading(false)
  }
}

// Example of updating an order status
async function updateOrderStatus(orderId, newStatus) {
  try {
    showLoading(true)

    // Update the status on the backend
    await apiService.orders.updateStatus(orderId, newStatus)

    // Update the local data
    const order = orders.find((o) => o.id === orderId)
    if (order) {
      order.status = newStatus
      displayOrders(orders)
    }

    showSuccess("Order status updated")
    showLoading(false)
  } catch (error) {
    showError("Failed to update order status. Please try again.")
    console.error("Error updating order status:", error)
    showLoading(false)
  }
}

// Helper functions for UI updates
function showLoading(isLoading) {
  const loadingElement = document.getElementById("loading-indicator")
  if (loadingElement) {
    loadingElement.style.display = isLoading ? "flex" : "none"
  }
}

function showError(message) {
  alert(message) // Replace with a better UI notification
}

function showSuccess(message) {
  alert(message) // Replace with a better UI notification
}

// Data storage
let orders = []
let vehicles = []
let clients = []
let inventory = []

// Store data functions
function storeOrders(data) {
  orders = data
}

function storeVehicles(data) {
  vehicles = data
}

function storeClients(data) {
  clients = data
}

function storeInventory(data) {
  inventory = data
}

// Display functions
function updateDashboardStats(stats) {
  document.getElementById("servicos-andamento").innerText = stats.servicesInProgress
  document.getElementById("aguardando-aprovacao").innerText = stats.awaitingApproval
  document.getElementById("concluidos-hoje").innerText = stats.completedToday
  document.getElementById("total-clientes").innerText = stats.totalClients
}

function displayRecentOrders(recentOrders) {
  const recentOrdersBody = document.getElementById("recent-orders-body")
  recentOrdersBody.innerHTML = recentOrders
    .map(
      (order) => `
    <tr>
      <td>${order.os}</td>
      <td>${order.cliente}</td>
      <td>${order.veiculo}</td>
      <td>${order.servico}</td>
      <td><span class="status ${order.status}">${getStatusText(order.status)}</span></td>
      <td>
        <button class="btn-icon" onclick="changeStatus('${order.id}', 'em-andamento')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </button>
        <button class="btn-icon" onclick="changeStatus('${order.id}', 'aguardando')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <button class="btn-icon" onclick="removeOrder('${order.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </td>
    </tr>
  `,
    )
    .join("")
}

function displayOrders(orders) {
  const ordersBody = document.getElementById("orders-body")
  ordersBody.innerHTML = orders
    .map(
      (order) => `
    <tr>
      <td>${order.os}</td>
      <td>${formatDate(order.data)}</td>
      <td>${order.cliente}</td>
      <td>${order.veiculo}</td>
      <td>${order.servico}</td>
      <td>R$ ${order.valor.toFixed(2)}</td>
      <td><span class="status ${order.status}">${getStatusText(order.status)}</span></td>
      <td class="actions">
        <button class="btn-icon" onclick="editOrder('${order.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
        <button class="btn-icon" onclick="removeOrder('${order.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </td>
    </tr>
  `,
    )
    .join("")
}

function displayVehicles(vehicles) {
  const vehiclesGrid = document.getElementById("vehicles-grid")
  vehiclesGrid.innerHTML = vehicles
    .map(
      (vehicle) => `
    <div class="vehicle-card">
      <div class="vehicle-info">
        <h3>${vehicle.marca} ${vehicle.modelo}</h3>
        <p><strong>Placa:</strong> ${vehicle.placa}</p>
        <p><strong>Cliente:</strong> ${vehicle.cliente}</p>
        <p><strong>Data:</strong> ${formatDate(vehicle.data)}</p>
      </div>
      <div class="vehicle-actions">
        <button class="btn-secondary" onclick="viewVehicleHistory('${vehicle.id}')">Histórico</button>
        <button class="btn-icon" onclick="deleteVehicle('${vehicle.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  `,
    )
    .join("")
}

function displayClients(clients) {
  const clientsGrid = document.getElementById("clients-grid")
  clientsGrid.innerHTML = clients
    .map(
      (client) => `
    <div class="client-card">
      <div class="client-info">
        <h3>${client.nome}</h3>
        <p><strong>CPF:</strong> ${client.cpf}</p>
        <p><strong>Telefone:</strong> ${client.telefone}</p>
        <p><strong>Email:</strong> ${client.email}</p>
        <p><strong>Veículos:</strong> ${client.veiculos}</p>
      </div>
      <div class="client-actions">
        <button class="btn-secondary" onclick="viewClientDetails('${client.id}')">Mais Detalhes</button>
        <button class="btn-primary" onclick="sendEmail('${client.email}')">Enviar E-mail</button>
      </div>
    </div>
  `,
    )
    .join("")
}

function displayInventory(inventory) {
  const inventoryBody = document.getElementById("inventory-body")
  inventoryBody.innerHTML = inventory
    .map(
      (item) => `
    <tr>
      <td>${item.id}</td>
      <td>${item.item}</td>
      <td>${item.categoria}</td>
      <td>${item.quantidade}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td>${item.fornecedor}</td>
      <td><span class="status ${item.status}">Em Estoque</span></td>
      <td class="actions">
        <button class="btn-icon" onclick="editInventoryItemPopup('${item.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
        <button class="btn-icon" onclick="deleteInventoryItem('${item.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </td>
    </tr>
  `,
    )
    .join("")
}

// Helper functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}

function getStatusText(status) {
  switch (status) {
    case "em-andamento":
      return "Em Andamento"
    case "aguardando":
      return "Aguardando"
    case "concluido":
      return "Concluído"
    case "em-estoque":
      return "Em Estoque"
    default:
      return status
  }
}

// Function to close a popup
function closePopup(popupId) {
  const popup = document.getElementById(popupId)
  if (popup) {
    popup.style.display = "none"
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Set up event listeners
  setupEventListeners()

  // Load data from backend
  loadDataFromBackend()
})

// Set up event listeners
function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault()
      const tabId = item.getAttribute("data-tab")

      // Remove active class from all tabs and menu items
      document.querySelectorAll(".tab-content").forEach((tab) => {
        tab.classList.remove("active")
      })
      document.querySelectorAll(".menu-item").forEach((menuItem) => {
        menuItem.classList.remove("active")
      })

      // Add active class to selected tab and menu item
      document.getElementById(tabId).classList.add("active")
      item.classList.add("active")

      // Close mobile menu if open
      document.getElementById("menu-toggle").checked = false
    })
  })

  // Form submissions
  document.getElementById("form-nova-ordem").addEventListener("submit", (event) => {
    event.preventDefault()
    const orderData = {
      os: document.getElementById("os").value,
      data: document.getElementById("data").value,
      cliente: document.getElementById("cliente").value,
      veiculo: document.getElementById("veiculo").value,
      servico: document.getElementById("servico").value,
      valor: Number.parseFloat(document.getElementById("valor").value),
      status: document.getElementById("status").value,
    }
    addOrderToBackend(orderData)
  })

  // Add other form event listeners here...
}

// Make functions available globally
window.changeStatus = (orderId, newStatus) => {
  updateOrderStatus(orderId, newStatus)
}

window.removeOrder = (orderId) => {
  if (confirm("Tem certeza que deseja remover esta ordem?")) {
    deleteOrder(orderId)
  }
}

window.editOrder = (orderId) => {
  // Implement edit order functionality
  console.log("Edit order:", orderId)
}

// Implement other global functions...

// Delete functions
async function deleteOrder(orderId) {
  try {
    showLoading(true)
    await apiService.orders.delete(orderId)
    orders = orders.filter((order) => order.id !== orderId)
    displayOrders(orders)
    showSuccess("Ordem removida com sucesso")
    showLoading(false)
  } catch (error) {
    showError("Falha ao remover ordem. Por favor, tente novamente.")
    console.error("Error deleting order:", error)
    showLoading(false)
  }
}

async function deleteVehicle(vehicleId) {
  try {
    showLoading(true)
    await apiService.vehicles.delete(vehicleId)
    vehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId)
    displayVehicles(vehicles)
    showSuccess("Veículo removido com sucesso")
    showLoading(false)
  } catch (error) {
    showError("Falha ao remover veículo. Por favor, tente novamente.")
    console.error("Error deleting vehicle:", error)
    showLoading(false)
  }
}

async function deleteInventoryItem(itemId) {
  try {
    showLoading(true)
    await apiService.inventory.delete(itemId)
    inventory = inventory.filter((item) => item.id !== itemId)
    displayInventory(inventory)
    showSuccess("Item removido com sucesso")
    showLoading(false)
  } catch (error) {
    showError("Falha ao remover item. Por favor, tente novamente.")
    console.error("Error deleting inventory item:", error)
    showLoading(false)
  }
}

