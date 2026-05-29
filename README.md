# KoinX Tax Loss Harvesting

A responsive React application that simulates Tax Loss Harvesting for cryptocurrency portfolios. The application allows users to select holdings and instantly visualize the impact on their capital gains after harvesting.

## Live Demo

🔗 [Live Demo](https://koinx-tax-harvesting-rho.vercel.app/)

---

## Features

### Capital Gains Dashboard

* Displays Pre-Harvesting Capital Gains
* Displays After-Harvesting Capital Gains
* Calculates:

  * Short-Term Capital Gains (STCG)
  * Long-Term Capital Gains (LTCG)
  * Net Capital Gains
  * Realised Capital Gains
  * Effective Capital Gains
* Displays estimated tax savings after harvesting

### Holdings Management

* Displays portfolio holdings in a structured table
* Individual asset selection
* Select/Deselect all holdings
* Dynamic harvesting calculations
* Amount-to-sell visibility for selected holdings

### User Experience

* Responsive design (Desktop + Mobile)
* Light and Dark mode support
* Mock API integration
* Zustand state management
* Modular and reusable component architecture

---

## Tech Stack

| Category         | Technology   |
| ---------------- | ------------ |
| Framework        | React + Vite |
| Language         | TypeScript   |
| Styling          | Tailwind CSS |
| UI Components    | shadcn/ui    |
| State Management | Zustand      |
| Deployment       | Vercel       |

---

## Project Structure

```text
src/
├── components/
│   ├── cards/
│   ├── table/
│   └── ui/ (shadcn components)
│
├── mockData/
│   ├── holdings.ts
│   └── capitalGains.ts
│
├── pages/
│   └── TaxHarvestingPage.tsx
│
├── services/
│   ├── holdings.ts
│   └── capitalGains.ts
│
├── store/
│   └── useHarvestStore.ts (zustand)
│
├── types/
│   └── index.ts
│
├── lib/
│   ├── calculations.ts
│   └── formatters.ts
│   └── utils.ts
└── App.tsx
```

---

## Application Flow

1. Holdings and capital gains data are fetched from mocked APIs.
2. Data is stored in Zustand.
3. Users select holdings using table checkboxes.
4. Selected holdings are processed through harvesting calculations.
5. Effective capital gains are recalculated in real-time.
6. Potential tax savings are displayed dynamically.

---

## Harvesting Logic

For every selected asset:

* Positive gains are added to profits.
* Negative gains are added to losses.

### Net Capital Gains

```text
Net Capital Gains = Profits - Losses
```

### Realised Capital Gains

```text
Realised Capital Gains = Net STCG + Net LTCG
```

### Tax Savings

```text
Savings = Pre-Harvesting Gains - Post-Harvesting Gains
```

The savings banner is displayed only when harvested gains are lower than the original gains.

---

## Assumptions

* Holdings data is mocked locally as provided in the assignment.
* Capital gains data is mocked locally as provided in the assignment.
* Synthetic IDs were generated for holdings because the provided dataset contains duplicate asset symbols.
* API requests are simulated using Promise-based services.
* Calculations use original numerical precision while UI values are formatted for readability.

---

## Setup Instructions

### Clone the repository

```bash
git clone <https://github.com/RitoG09/koinx_assignment>
```

### Navigate to the project

```bash
cd koinx-tax-harvesting
```

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Screenshots

### Desktop - Light Mode

<img width="1900" height="923" alt="image" src="https://github.com/user-attachments/assets/12f9856b-8a3b-46c9-aef8-7b9ab314e289" />


### Desktop - Dark Mode

<img width="1900" height="916" alt="image" src="https://github.com/user-attachments/assets/ef040347-51e7-4aad-9c5c-a349a4e48987" />


### Mobile - Light Mode

<img width="720" height="1600" alt="qwq" src="https://github.com/user-attachments/assets/38ae897d-156d-466e-89b3-79418457a882" />


### Mobile - Dark Mode

<img width="720" height="1600" alt="qww" src="https://github.com/user-attachments/assets/aa0bf59f-7b4e-4cb1-b238-4475880dfc9e" />


---

## Future Improvements

* Real API integration
* Asset sorting and filtering
* Portfolio analytics dashboard
* Export harvesting reports

---

Developed as part of the **KoinX Frontend Intern Assignment**.
