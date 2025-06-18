export function setupCalculator() {
  const usersInput = document.getElementById('users')
  const addonsToggle = document.getElementById('addons')
  
  const spikePrice = document.getElementById('spike-price')
  const pagerdutyPrice = document.getElementById('pagerduty-price')
  const savingsAmount = document.getElementById('savings-amount')
  const savingsPercentage = document.getElementById('savings-percentage')
  const addonsStatus = document.getElementById('addons-status')

  // Pricing constants (annual)
  const SPIKE_ANNUAL_PER_USER = 180 // $15/month * 12
  const PAGERDUTY_ANNUAL_PER_USER = 720 // $60/month * 12
  const PAGERDUTY_ADDONS_ANNUAL = 144000 // flat rate per year

  // Validation constants
  const MIN_USERS = 1
  const MAX_USERS = 99999

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('$', '')
  }

  function showPopup(message) {
    // Create popup overlay
    const overlay = document.createElement('div')
    overlay.className = 'popup-overlay'
    
    // Create popup content
    const popup = document.createElement('div')
    popup.className = 'popup'
    
    popup.innerHTML = `
      <div class="popup-content">
        <div class="popup-icon">⚠️</div>
        <h3>Invalid Input</h3>
        <p>${message}</p>
        <button class="popup-button" onclick="this.closest('.popup-overlay').remove()">OK</button>
      </div>
    `
    
    overlay.appendChild(popup)
    document.body.appendChild(overlay)
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove()
      }
    }, 5000)
  }

  function validateUsers(value) {
    // If empty or not a number, return null (no validation needed)
    if (!value || value.trim() === '') {
      return null
    }

    const users = parseInt(value)
    
    if (isNaN(users) || users < MIN_USERS) {
      showPopup(`Please enter a minimum of ${MIN_USERS} user.`)
      usersInput.value = ''
      return null
    }
    
    if (users > MAX_USERS) {
      showPopup(`Maximum number of users allowed is ${MAX_USERS.toLocaleString()}.`)
      usersInput.value = ''
      return null
    }
    
    return users
  }

  function calculateCosts() {
    const users = validateUsers(usersInput.value)
    
    // If no valid users entered, show placeholder values
    if (users === null) {
      spikePrice.textContent = '-'
      pagerdutyPrice.textContent = '-'
      savingsAmount.textContent = '-'
      savingsPercentage.textContent = 'Enter users to calculate'
      
      // Update add-ons status based on toggle
      const includeAddons = addonsToggle.checked
      if (includeAddons) {
        addonsStatus.textContent = 'Essential add-ons included'
        addonsStatus.style.background = 'rgba(16, 185, 129, 0.1)'
        addonsStatus.style.color = '#059669'
      } else {
        addonsStatus.textContent = 'Add-ons not included'
        addonsStatus.style.background = 'rgba(239, 68, 68, 0.1)'
        addonsStatus.style.color = '#dc2626'
      }
      return
    }

    const includeAddons = addonsToggle.checked
    
    // Calculate annual costs
    const spikeAnnual = users * SPIKE_ANNUAL_PER_USER
    let pagerdutyAnnual = users * PAGERDUTY_ANNUAL_PER_USER
    
    // Add PagerDuty add-ons if selected
    if (includeAddons) {
      pagerdutyAnnual += PAGERDUTY_ADDONS_ANNUAL
    }

    // Calculate savings
    const savingsValue = pagerdutyAnnual - spikeAnnual
    const savingsPercent = ((savingsValue / pagerdutyAnnual) * 100)

    // Update UI
    spikePrice.textContent = formatCurrency(spikeAnnual)
    pagerdutyPrice.textContent = formatCurrency(pagerdutyAnnual)
    savingsAmount.textContent = formatCurrency(savingsValue)
    savingsPercentage.textContent = `${savingsPercent.toFixed(1)}% less`

    // Update add-ons status
    if (includeAddons) {
      addonsStatus.textContent = 'Essential add-ons included'
      addonsStatus.style.background = 'rgba(16, 185, 129, 0.1)'
      addonsStatus.style.color = '#059669'
    } else {
      addonsStatus.textContent = 'Add-ons not included'
      addonsStatus.style.background = 'rgba(239, 68, 68, 0.1)'
      addonsStatus.style.color = '#dc2626'
    }
  }

  // Event listeners
  usersInput.addEventListener('input', calculateCosts)
  usersInput.addEventListener('blur', calculateCosts) // Validate on blur as well
  addonsToggle.addEventListener('change', calculateCosts)

  // Set input attributes for better mobile experience
  usersInput.setAttribute('min', MIN_USERS)
  usersInput.setAttribute('max', MAX_USERS)
  usersInput.setAttribute('inputmode', 'numeric')
  usersInput.setAttribute('pattern', '[0-9]*')

  // Initial calculation (will show placeholders since no value is set)
  calculateCosts()
}