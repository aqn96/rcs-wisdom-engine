# 🤖 RCS Wisdom Engine

A serverless Android automation project that bridges public REST APIs with mobile telephony protocols (RCS/MMS).

## 💰 Cost & Efficiency Analysis
This project implements a **Local-First** execution model, bypassing the need for subscription-based middleware (e.g., Zapier/Make.com) which can cost upwards of $200/year.

| Component         | Provider            | Cost                |
| :---------------- | :------------------ | :------------------ |
| **Logic Engine** | Tasker Android App  | **~$5.00 (One-time)** |
| **Data Ingress** | Public REST APIs    | $0.00 (Free Tiers)  |
| **Transport** | Carrier RCS/MMS     | $0.00 (Standard)    |
| **Monthly OpEx** |                     | **$0.00** |

## 🧱 Architecture
The system functions as a mobile-native **Cron Job**:
* **Trigger**: A Tasker Time-Profile wakes the CPU.
* **Logic**: A JavaScriptlet handles async `fetch` requests and dynamic JSON parsing.
* **Transport**: Payload is handed to the Android Telephony stack, which negotiates delivery via RCS (Rich Communication Services) for high-fidelity cross-platform messaging (Android/iOS).

## 🛠️ Deployment
1. **Prerequisites**: Android device + Tasker ($5 license).
2. **Implementation**: 
   - Create Task `WisdomEngine`.
   - Add **JavaScriptlet** action; insert `scripts/engine_logic.js`.
   - Add **Send SMS** action. Target recipient(s); use `%message` as text.
3. **Trigger**: Assign a **Time Profile** to execute daily.

---
*Developed by Andrew | Northeastern University Align Program | Incoming Microsoft WANIP Team*
