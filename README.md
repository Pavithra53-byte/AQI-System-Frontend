#  VayuRaksha – Frontend Dashboard  
### Hyper-Local AQI Intelligence & Mitigation System

VayuRaksha Frontend is a modern, responsive web dashboard built using **React.js** and **Tailwind CSS**.  
It visualizes ward-level air quality data, pollution predictions, AI-driven insights, and mitigation status in real-time.

---

##  Project Overview

The frontend provides an interactive command-center style dashboard for monitoring:

-  Real-time AQI (PM2.5, PM10, NO₂, SO₂, CO)
-  1–24 hour pollution predictions
-  AI-generated pollution source insights
-  Automated mitigation status (Filter Cube activation)
-  Ward-wise monitoring across 12 Delhi-NCR hotspots

This interface is designed for:
- Municipal authorities
- Smart City administrators
- Environmental monitoring agencies

---

##  Monitored Locations

The dashboard currently supports 12 hyper-local monitoring zones:

- AIIMS Delhi  
- Anand Vihar  
- Chandni Chowk  
- Connaught Place  
- Dwarka  
- Faridabad  
- Ghaziabad  
- Greater Noida  
- Gurugram  
- Lodhi Road  
- Noida Sector 62  
- Vasant Kunj  

---

## Tech Stack

### Frontend
-  React.js
-  Tailwind CSS
-  Chart.js / Recharts (for prediction graphs)
-  Leaflet / Mapbox (for location visualization)

### Backend Integration
- REST APIs (JSON data streaming)
- Real-time pollutant updates
- Prediction endpoints (RandomForestRegressor model)

---

##  Core Features

###  Ward-Level AQI Monitoring
Color-coded AQI cards for each location:
- 🟢 Good
- 🟡 Moderate
- 🟠 Poor
- 🔴 Severe

---

###  ML-Based Prediction Display
- 1–24 hour pollutant forecasts
- Threshold line visualization
- Trend indicators (↑ ↓ →)

---

###  AI Insight Panel
Displays:
- Probable pollution source
- Risk level classification
- Recommended administrative action

---

###  Mitigation Status
- Filter Cube activation status
- Threshold breach detection
- Real-time mitigation logs

---

###  Closed-Loop Governance Flow

Monitoring → Prediction → Insight → Mitigation → Action

---


