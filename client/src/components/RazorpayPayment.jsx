import { useEffect } from 'react';
import axios from 'axios';

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiateRazorpayPayment = async ({
  amount,
  currency = 'INR',
  name,
  description,
  onSuccess,
  onFailure,
  customerName,
  customerEmail,
  customerPhone
}) => {
  try {
    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Failed to load payment gateway. Please check your internet connection.');
      return;
    }

    // Get Razorpay key
    const { data: keyData } = await axios.get('/api/payment/key');
    const razorpayKey = keyData.key;

    // Create order
    const { data: orderData } = await axios.post('/api/payment/create-order', {
      amount,
      currency,
      receipt: `order_${Date.now()}`
    });

    if (!orderData.success) {
      throw new Error('Failed to create order');
    }

    const options = {
      key: razorpayKey,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: name || 'WaitNot',
      description: description || 'Order Payment',
      order_id: orderData.order.id,
      prefill: {
        name: customerName || '',
        email: customerEmail || '',
        contact: customerPhone || ''
      },
      theme: {
        color: '#EF4444' // Primary red color
      },
      handler: async function (response) {
        try {
          // Verify payment
          const { data: verifyData } = await axios.post('/api/payment/verify-payment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          if (verifyData.success) {
            onSuccess && onSuccess(response);
          } else {
            onFailure && onFailure(new Error('Payment verification failed'));
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          onFailure && onFailure(error);
        }
      },
      modal: {
        ondismiss: function () {
          onFailure && onFailure(new Error('Payment cancelled by user'));
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Razorpay payment error:', error);
    onFailure && onFailure(error);
  }
};

export default { initiateRazorpayPayment };
