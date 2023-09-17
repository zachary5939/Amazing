// src/utils/analytics.js
import ReactGA from 'react-ga';

// Initialize Google Analytics with your tracking ID
ReactGA.initialize('G-Q9ZG4MKHZ4');

// This function will be used to log page views
export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
