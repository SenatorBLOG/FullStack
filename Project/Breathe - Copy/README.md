
  # Breathe

  This is a code bundle for Breathe. The original project is available at https://www.figma.com/design/KRdXbTzEIS4wAPOm1nQWRt/Breathe.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Individual Chart Components
  1. **WeeklyActivityChart**: Shows daily meditation minutes with Chart 3's
  blue bars and hover tooltips
  2. **AnnualProgressChart**: Stacked bar chart with flowing line overlay showing
  yearly progress
  3. **MetricCards**: Three cards displaying average session time, total
  sessions, and current streak with mini charts
  4. **MoodQualificationChart**: Horizontal bars with emoji faces showing mood distribution
  5. **MonthlyActivityChart**: Donut chart showing session duration breakdown

  
  Avg session time — average session duration (min) over the last 7 days + mini-line (avg by day) + % change from the previous 7 days;

Total sessions — the total number of sessions over the last 7 days + a mini-line (number of sessions by day) + % change from the previous 7 days;

Current streak — the current series of consecutive days with >=1 session (counting from today back) + change vs previous series.