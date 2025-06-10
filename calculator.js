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

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('$', '')
  }

  function calculateCosts() {
    const users = parseInt(usersInput.value) || 1
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
  addonsToggle.addEventListener('change', calculateCosts)

  // Initial calculation
  calculateCosts()
}