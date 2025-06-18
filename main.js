import './style.css'
import { setupCalculator } from './calculator.js'

document.querySelector('#app').innerHTML = `
  <div class="calculator-container">
    <header class="header">
      <h1>Spike vs PagerDuty</h1>
      <p>Annual Cost Savings Calculator</p>
    </header>

    <div class="calculator-content">
      <div class="input-section">
        <div class="input-group">
          <label for="users">Number of Users</label>
          <input type="number" id="users" value="" min="1" placeholder="Enter number of users">
        </div>

        <div class="toggle-group">
          <div class="toggle-container">
            <label class="toggle">
              <input type="checkbox" id="addons">
              <span class="toggle-slider"></span>
            </label>
            <span class="toggle-text">Include PagerDuty Essential Add-ons ($144,000/year)</span>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <div class="pricing-cards">
          <div class="pricing-card spike-card">
            <h3>Spike</h3>
            <div class="price">
              <span class="currency">$</span>
              <span class="amount" id="spike-price">-</span>
            </div>
            <div class="period">per year</div>
          </div>

          <div class="pricing-card pagerduty-card">
            <h3>PagerDuty</h3>
            <div class="price">
              <span class="currency">$</span>
              <span class="amount" id="pagerduty-price">-</span>
            </div>
            <div class="period">per year</div>
            <div class="addons-note" id="addons-status">Add-ons not included</div>
          </div>
        </div>

        <div class="savings-section">
          <div class="savings-card">
            <div class="savings-label">Annual Savings</div>
            <div class="savings-amount">
              <span class="currency">$</span>
              <span class="amount" id="savings-amount">-</span>
            </div>
            <div class="savings-percentage" id="savings-percentage">Enter users to calculate</div>
          </div>
        </div>
      </div>
    </div>
  </div>
`

setupCalculator()