# Multi-Payment Gateway Setup Guide

## Overview

This system allows restaurants to configure multiple payment methods (PhonePe, Paytm, Google Pay, Razorpay, etc.) and receive payments directly to their merchant IDs/UPI IDs.

## Payment Methods Supported

1. **PhonePe** - UPI ID or Merchant ID
2. **Paytm** - Merchant ID or UPI ID
3. **Google Pay** - UPI ID
4. **Razorpay** - API Keys
5. **UPI** - Any UPI ID
6. **Bank Transfer** - Account details

## Restaurant Payment Configuration Structure

### Database Schema

Add to `server/data/restaurants.json`:

```json
{
  "_id": "restaurant_id",
  "name": "Restaurant Name",
  "paymentMethods": {
    "phonepe": {
      "enabled": true,
      "merchantId": "PHONEPE123456",
      "upiId": "restaurant@ybl",
      "displayName": "PhonePe"
    },
    "paytm": {
      "enabled": true,
      "merchantId": "PAYTM789012",
      "upiId": "restaurant@paytm",
      "displayName": "Paytm"
    },
    "googlepay": {
      "enabled": true,
      "upiId": "restaurant@okaxis",
      "displayName": "Google Pay"
    },
    "razorpay": {
      "enabled": false,
      "keyId": "rzp_test_XXXXX",
      "keySecret": "SECRET_KEY",
      "displayName": "Razorpay"
    },
    "upi": {
      "enabled": true,
      "upiId": "restaurant@ybl",
      "displayName": "UPI"
    },
    "cash": {
      "enabled": true,
      "displayName": "Cash on Delivery"
    }
  },
  "defaultPaymentMethod": "phonepe"
}
```

## Implementation

### 1. Backend - Payment Configuration Route

Create `server/routes/restaurantPayment.js`:

```javascript
import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();
const restaurantsPath = path.join(process.cwd(), 'data', 'restaurants.json');

// Get restaurant payment methods
router.get('/:restaurantId/payment-methods', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const data = await fs.readFile(restaurantsPath, 'utf8');
    const restaurants = JSON.parse(data);
    
    const restaurant = restaurants.find(r => r._id === restaurantId);
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Return only enabled payment methods (hide sensitive data)
    const enabledMethods = {};
    if (restaurant.paymentMethods) {
      Object.keys(restaurant.paymentMethods).forEach(method => {
        if (restaurant.paymentMethods[method].enabled) {
          enabledMethods[method] = {
            displayName: restaurant.paymentMethods[method].displayName,
            upiId: restaurant.paymentMethods[method].upiId,
            // Don't expose secrets
          };
        }
      });
    }

    res.json({
      success: true,
      paymentMethods: enabledMethods,
      defaultMethod: restaurant.defaultPaymentMethod || 'upi'
    });
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update restaurant payment methods (Admin/Restaurant Owner only)
router.put('/:restaurantId/payment-methods', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { paymentMethods, defaultPaymentMethod } = req.body;

    const data = await fs.readFile(restaurantsPath, 'utf8');
    const restaurants = JSON.parse(data);
    
    const restaurantIndex = restaurants.findIndex(r => r._id === restaurantId);
    
    if (restaurantIndex === -1) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    restaurants[restaurantIndex].paymentMethods = paymentMethods;
    restaurants[restaurantIndex].defaultPaymentMethod = defaultPaymentMethod;

    await fs.writeFile(restaurantsPath, JSON.stringify(restaurants, null, 2));

    res.json({
      success: true,
      message: 'Payment methods updated successfully'
    });
  } catch (error) {
    console.error('Error updating payment methods:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

### 2. Frontend - Payment Method Selector Component

Create `client/src/components/PaymentMethodSelector.jsx`:

```javascript
import React, { useState, useEffect } from 'react';
import { Smartphone, Wallet, CreditCard, DollarSign } from 'lucide-react';
import axios from 'axios';

const PaymentMethodSelector = ({ restaurantId, onSelect, selectedMethod }) => {
  const [paymentMethods, setPaymentMethods] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentMethods();
  }, [restaurantId]);

  const fetchPaymentMethods = async () => {
    try {
      const { data } = await axios.get(`/api/restaurants/${restaurantId}/payment-methods`);
      setPaymentMethods(data.paymentMethods);
      
      // Auto-select default method
      if (!selectedMethod && data.defaultMethod) {
        onSelect(data.defaultMethod);
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (method) => {
    switch (method) {
      case 'phonepe':
      case 'paytm':
      case 'googlepay':
        return <Smartphone size={24} />;
      case 'upi':
        return <Wallet size={24} />;
      case 'razorpay':
        return <CreditCard size={24} />;
      case 'cash':
        return <DollarSign size={24} />;
      default:
        return <Wallet size={24} />;
    }
  };

  const getColor = (method) => {
    switch (method) {
      case 'phonepe':
        return 'bg-purple-600';
      case 'paytm':
        return 'bg-blue-600';
      case 'googlepay':
        return 'bg-green-600';
      case 'razorpay':
        return 'bg-indigo-600';
      case 'upi':
        return 'bg-orange-600';
      case 'cash':
        return 'bg-gray-600';
      default:
        return 'bg-primary';
    }
  };

  if (loading) {
    return <div>Loading payment methods...</div>;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-gray-800 mb-3">Select Payment Method</h3>
      
      {Object.keys(paymentMethods).map((method) => {
        const methodData = paymentMethods[method];
        const isSelected = selectedMethod === method;
        
        return (
          <label
            key={method}
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              isSelected
                ? 'border-primary bg-red-50'
                : 'border-gray-200 hover:border-primary'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={isSelected}
              onChange={() => onSelect(method)}
              className="hidden"
            />
            
            <div className={`${getColor(method)} text-white p-2 rounded-lg`}>
              {getIcon(method)}
            </div>
            
            <div className="flex-1">
              <div className="font-semibold text-gray-800">
                {methodData.displayName}
              </div>
              {methodData.upiId && (
                <div className="text-sm text-gray-500">
                  {methodData.upiId}
                </div>
              )}
            </div>
            
            {isSelected && (
              <div className="text-primary">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </label>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;
```

### 3. Update QROrder.jsx to Use Multiple Payment Methods

```javascript
import PaymentMethodSelector from '../components/PaymentMethodSelector';

// In your component
const [paymentMethod, setPaymentMethod] = useState('');

// In the checkout section, replace the payment method selection:
<PaymentMethodSelector
  restaurantId={restaurantId}
  onSelect={setPaymentMethod}
  selectedMethod={paymentMethod}
/>

// Update placeOrder function:
const placeOrder = async () => {
  try {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please enter your name and phone number');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // For UPI-based payments (PhonePe, Paytm, Google Pay, UPI)
    if (['phonepe', 'paytm', 'googlepay', 'upi'].includes(paymentMethod)) {
      // Get payment method details
      const { data } = await axios.get(`/api/restaurants/${restaurantId}/payment-methods`);
      const methodData = data.paymentMethods[paymentMethod];

      // Create UPI payment link
      const upiLink = `upi://pay?pa=${methodData.upiId}&pn=${restaurant.name}&am=${total}&cu=INR&tn=Order-${Date.now()}`;
      
      // Open UPI app
      window.location.href = upiLink;

      // Create order with pending status
      const orderData = {
        restaurantId,
        tableNumber: parseInt(tableNumber),
        items: cart.map(item => ({
          menuItemId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: total,
        orderType: 'dine-in',
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        paymentStatus: 'pending',
        paymentMethod: paymentMethod
      };

      await axios.post('/api/orders', orderData);
      
      // Show confirmation
      setOrderPlaced(true);
      setTimeout(() => {
        setOrderPlaced(false);
        setCart([]);
        setShowCheckout(false);
      }, 3000);
    }
    
    // For Razorpay
    else if (paymentMethod === 'razorpay') {
      initiateRazorpayPayment({
        amount: total,
        name: restaurant.name,
        description: `Table ${tableNumber}`,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        restaurantId: restaurantId,
        onSuccess: async (response) => {
          const orderData = {
            restaurantId,
            tableNumber: parseInt(tableNumber),
            items: cart.map(item => ({
              menuItemId: item._id,
              name: item.name,
              price: item.price,
              quantity: item.quantity
            })),
            totalAmount: total,
            orderType: 'dine-in',
            customerName: customerInfo.name,
            customerPhone: customerInfo.phone,
            paymentStatus: 'paid',
            paymentMethod: 'razorpay',
            razorpayPaymentId: response.razorpay_payment_id
          };

          await axios.post('/api/orders', orderData);
          setOrderPlaced(true);
        },
        onFailure: (error) => {
          alert('Payment failed. Please try again.');
        }
      });
    }
    
    // For Cash
    else if (paymentMethod === 'cash') {
      const orderData = {
        restaurantId,
        tableNumber: parseInt(tableNumber),
        items: cart.map(item => ({
          menuItemId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: total,
        orderType: 'dine-in',
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        paymentStatus: 'pending',
        paymentMethod: 'cash'
      };

      await axios.post('/api/orders', orderData);
      setOrderPlaced(true);
    }
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Failed to place order');
  }
};
```

### 4. Restaurant Dashboard - Payment Settings Page

Create `client/src/pages/RestaurantPaymentSettings.jsx`:

```javascript
import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';

const RestaurantPaymentSettings = () => {
  const restaurantId = localStorage.getItem('restaurantId');
  
  const [paymentMethods, setPaymentMethods] = useState({
    phonepe: {
      enabled: false,
      merchantId: '',
      upiId: '',
      displayName: 'PhonePe'
    },
    paytm: {
      enabled: false,
      merchantId: '',
      upiId: '',
      displayName: 'Paytm'
    },
    googlepay: {
      enabled: false,
      upiId: '',
      displayName: 'Google Pay'
    },
    razorpay: {
      enabled: false,
      keyId: '',
      keySecret: '',
      displayName: 'Razorpay'
    },
    upi: {
      enabled: false,
      upiId: '',
      displayName: 'UPI'
    },
    cash: {
      enabled: true,
      displayName: 'Cash'
    }
  });

  const [defaultMethod, setDefaultMethod] = useState('cash');
  const [saving, setSaving] = useState(false);

  const handleToggle = (method) => {
    setPaymentMethods({
      ...paymentMethods,
      [method]: {
        ...paymentMethods[method],
        enabled: !paymentMethods[method].enabled
      }
    });
  };

  const handleChange = (method, field, value) => {
    setPaymentMethods({
      ...paymentMethods,
      [method]: {
        ...paymentMethods[method],
        [field]: value
      }
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put(`/api/restaurants/${restaurantId}/payment-methods`, {
        paymentMethods,
        defaultPaymentMethod: defaultMethod
      });
      alert('Payment settings saved successfully!');
    } catch (error) {
      console.error('Error saving payment settings:', error);
      alert('Failed to save payment settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Payment Settings
        </h1>

        <div className="space-y-6">
          {/* PhonePe */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">PhonePe</h3>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentMethods.phonepe.enabled}
                  onChange={() => handleToggle('phonepe')}
                  className="mr-2"
                />
                <span>Enable</span>
              </label>
            </div>
            
            {paymentMethods.phonepe.enabled && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Merchant ID (optional)"
                  value={paymentMethods.phonepe.merchantId}
                  onChange={(e) => handleChange('phonepe', 'merchantId', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="UPI ID (e.g., restaurant@ybl)"
                  value={paymentMethods.phonepe.upiId}
                  onChange={(e) => handleChange('phonepe', 'upiId', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Paytm */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Paytm</h3>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentMethods.paytm.enabled}
                  onChange={() => handleToggle('paytm')}
                  className="mr-2"
                />
                <span>Enable</span>
              </label>
            </div>
            
            {paymentMethods.paytm.enabled && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Merchant ID (optional)"
                  value={paymentMethods.paytm.merchantId}
                  onChange={(e) => handleChange('paytm', 'merchantId', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="UPI ID (e.g., restaurant@paytm)"
                  value={paymentMethods.paytm.upiId}
                  onChange={(e) => handleChange('paytm', 'upiId', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Google Pay */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Google Pay</h3>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentMethods.googlepay.enabled}
                  onChange={() => handleToggle('googlepay')}
                  className="mr-2"
                />
                <span>Enable</span>
              </label>
            </div>
            
            {paymentMethods.googlepay.enabled && (
              <input
                type="text"
                placeholder="UPI ID (e.g., restaurant@okaxis)"
                value={paymentMethods.googlepay.upiId}
                onChange={(e) => handleChange('googlepay', 'upiId', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            )}
          </div>

          {/* Generic UPI */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">UPI (Any App)</h3>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentMethods.upi.enabled}
                  onChange={() => handleToggle('upi')}
                  className="mr-2"
                />
                <span>Enable</span>
              </label>
            </div>
            
            {paymentMethods.upi.enabled && (
              <input
                type="text"
                placeholder="UPI ID"
                value={paymentMethods.upi.upiId}
                onChange={(e) => handleChange('upi', 'upiId', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            )}
          </div>

          {/* Cash */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Cash Payment</h3>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentMethods.cash.enabled}
                  onChange={() => handleToggle('cash')}
                  className="mr-2"
                />
                <span>Enable</span>
              </label>
            </div>
          </div>

          {/* Default Method */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Default Payment Method</h3>
            <select
              value={defaultMethod}
              onChange={(e) => setDefaultMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {Object.keys(paymentMethods).map(method => (
                paymentMethods[method].enabled && (
                  <option key={method} value={method}>
                    {paymentMethods[method].displayName}
                  </option>
                )
              ))}
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:bg-red-600 disabled:bg-gray-300 flex items-center justify-center gap-2"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Payment Settings'}
        </button>
      </div>
    </div>
  );
};

export default RestaurantPaymentSettings;
```

## How It Works

1. **Restaurant Setup**: Restaurant owner configures their payment methods in dashboard
2. **Customer Selection**: Customer sees only enabled payment methods
3. **Payment Processing**:
   - **UPI-based** (PhonePe, Paytm, Google Pay): Opens UPI app with restaurant's UPI ID
   - **Razorpay**: Uses Razorpay gateway
   - **Cash**: Marks order as cash payment

4. **Money Flow**: Payments go directly to restaurant's configured UPI ID/merchant account

## Benefits

✅ Multiple payment options for customers
✅ Direct payments to restaurant accounts
✅ Flexible configuration per restaurant
✅ Easy to add new payment methods
✅ No middleman fees (for UPI)
✅ Restaurant controls their payment methods

## Next Steps

1. Add payment settings route to server
2. Create payment method selector component
3. Update order pages to use new payment system
4. Add payment settings page to restaurant dashboard
5. Test with different payment methods
