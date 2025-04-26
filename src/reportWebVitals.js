// src/reportWebVitals.js
const reportWebVitals = (metric) => {
    if (process.env.NODE_ENV === 'production') {
        window.gtag('event', metric.name, {
            value: metric.value,
            event_category: 'Web Vitals',
        });
    }
};
export default reportWebVitals;