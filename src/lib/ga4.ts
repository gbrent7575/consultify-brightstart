// GA4 conversion tracking helpers
// Replace G-XXXXXXXXXX in index.html with your real Measurement ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackBookConsultation = () => {
  window.gtag?.('event', 'book_consultation_click', {
    event_category: 'conversion',
    event_label: 'cal_com_booking',
    value: 1,
  });
};

export const trackQuoteFormSubmission = () => {
  window.gtag?.('event', 'quote_form_submission', {
    event_category: 'conversion',
    event_label: 'quote_request',
    value: 1,
  });
};

export const trackPhoneClick = () => {
  window.gtag?.('event', 'phone_click', {
    event_category: 'conversion',
    event_label: 'phone_call',
    value: 1,
  });
};

export const trackGetStartedClick = () => {
  window.gtag?.('event', 'get_started_click', {
    event_category: 'conversion',
    event_label: 'setup_interest',
    value: 1,
  });
};
