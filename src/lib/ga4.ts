// GA4 conversion tracking helpers
// Replace G-XXXXXXXXXX in index.html with your real Measurement ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export type QuoteFormPlatform =
  | 'ISNetworld'
  | 'Avetta'
  | 'Veriforce'
  | 'PEC Premier'
  | 'BROWZ'
  | 'Multiple'
  | 'Other';

export type QuoteFormSourcePage =
  | 'home'
  | 'isnetworld-help'
  | 'avetta-help'
  | 'veriforce-help';

export const trackBookConsultation = () => {
  window.gtag?.('event', 'book_consultation_click', {
    event_category: 'conversion',
    event_label: 'cal_com_booking',
    value: 1,
  });
};

export const trackQuoteFormSubmission = (
  platforms: QuoteFormPlatform,
  source_page: QuoteFormSourcePage,
) => {
  window.gtag?.('event', 'quote_form_submission', {
    platforms,
    source_page,
  });
};

export const trackPhoneClick = () => {
  window.gtag?.('event', 'qualified_phone_call', {
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
