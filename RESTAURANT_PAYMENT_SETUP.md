# Restaurant-Specific Razorpay Payment Setup

## Overview

This guide explains how to set up restaurant-specific Razorpay accounts so each restaurant receives payments directly to their own UPI ID.

## Implementation Steps

### 1. Add Payment Fields to Restaurant Model

Each restaurant needs these additional fields in `server/data/restaurants.json`:

```json
{
  "_id": "restaurant_id",
  "name": "Restaurant Name",
  // ... existing fields ...
  "paymentConfig": {
    "razorpayKeyId": "rzp_test_XXXXX",
    "razorpayKeySecret": "SECRET_KEY",
    "upiId": "restaurant@ybl",
    "accountName": "Restaurant Owner Name"
  }
}
```

### 2. Update Payment Route

Modify `server/routes/payment.js` to use restaurant-specific credentials:

```javascript
// Create Razorpay order with restaurant-specific credentials
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, restaurantId } = req.body;

    // Get restaurant payment config
    const restaurant = await getRestaurantById(restaurantId);
    
    if (!restaurant || !restaurant.paymentConfig) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant payment configuration not found'
      });
    }

    // Initialize Razorpay with restaurant-specific credentials
    const razorpay = new Razorpay({
      key_id: restaurant.paymentConfig.razorpayKeyId,
      key_secret: restaurant.paymentConfig.razorpayKeySecret
    });

    const options = {
      amount: amount * 100,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        restaurantId: restaurantId,
        upiId: restaurant.paymentConfig.upiId
      }
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      order,
      keyId: restaurant.paymentConfig.razorpayKeyId
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

### 3. Update Frontend Payment Component

Modify `client/src/components/RazorpayPayment.jsx`:

```javascript
export const initiateRazorpayPayment = async ({
  amount,
  name,
  description,
  customerName,
  customerPhone,
  restaurantId, // Add this
  onSuccess,
  onFailure
}) => {
  try {
    // Create order with restaurant ID
    const orderResponse = await axios.post('/api/payment/create-order', {
      amount,
      restaurantId // Pass restaurant ID
    });

    const { order, keyId } = orderResponse.data;

    const options = {
      key: keyId, // Use restaurant-specific key
      amount: order.amount,
      currency: order.currency,
      name: name,
      description: description,
      order_id: order.id,
      prefill: {
        name: customerName,
        contact: customerPhone
      },
      theme: {
        color: '#EF4444'
      },
      handler: function (response) {
        onSuccess(response);
      },
      modal: {
        ondismiss: function() {
          onFailure({ message: 'Payment cancelled by user' });
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    onFailure(error);
  }
};
```

### 4. Update Order Pages

Update `QROrder.jsx` and `Checkout.jsx` to pass restaurant ID:

```javascript
initiateRazorpayPayment({
  amount: total,
  name: restaurant.name,
  description: `Table ${tableNumber} - ${restaurant.name}`,
  customerName: customerInfo.name,
  customerPhone: customerInfo.phone,
  restaurantId: restaurantId, // Add this
  onSuccess: async (response) => {
    // Handle success
  },
  onFailure: (error) => {
    // Handle failure
  }
});
```

## Setting Up Razorpay Accounts for Each Restaurant

### For Restaurant Owners:

1. **Create Razorpay Account**
   - Go to https://razorpay.com
   - Sign up with restaurant email
   - Complete KYC verification

2. **Get API Keys**
   - Go to Settings > API Keys
   - Generate Test/Live keys
   - Copy Key ID and Key Secret

3. **Set Up UPI**
   - Go to Settings > Payment Methods
   - Enable UPI
   - Add your UPI ID (e.g., restaurant@ybl)

4. **Provide Credentials to Admin**
   - Razorpay Key ID
   - Razorpay Key Secret
   - UPI ID
   - Account holder name

### For Admin:

Update restaurant data with payment configuration:

```json
{
  "_id": "restaurant1",
  "name": "Spice Garden",
  "paymentConfig": {
    "razorpayKeyId": "rzp_test_ABC123",
    "razorpayKeySecret": "SECRET_KEY_123",
    "upiId": "spicegarden@ybl",
    "accountName": "Spice Garden Restaurant"
  }
}
```

## Benefits

1. **Direct Payments**: Each restaurant receives payments directly to their account
2. **Separate Accounting**: Each restaurant has their own transaction history
3. **Custom UPI**: Restaurants can use their own UPI IDs
4. **Independent Settlement**: Razorpay settles to each restaurant's bank account
5. **Transparent**: Restaurant owners can track their own payments

## Testing

### Test Mode:
- Use Razorpay test keys
- Test UPI: success@razorpay
- Test cards provided by Razorpay

### Live Mode:
- Switch to live keys after testing
- Real UPI IDs
- Real bank account settlement

## Security Notes

1. **Never expose key_secret in frontend**
2. **Store credentials securely in backend**
3. **Use environment variables for production**
4. **Implement proper authentication for restaurant dashboard**
5. **Validate restaurant ownership before showing payment details**

## Restaurant Dashboard Integration

Add payment settings page in restaurant dashboard:

```javascript
// RestaurantPaymentSettings.jsx
const PaymentSettings = () => {
  const [paymentConfig, setPaymentConfig] = useState({
    razorpayKeyId: '',
    razorpayKeySecret: '',
    upiId: '',
    accountName: ''
  });

  const handleSave = async () => {
    await axios.put(`/api/restaurants/${restaurantId}/payment-config`, paymentConfig);
  };

  return (
    <div>
      <h2>Payment Configuration</h2>
      <input 
        placeholder="Razorpay Key ID"
        value={paymentConfig.razorpayKeyId}
        onChange={(e) => setPaymentConfig({...paymentConfig, razorpayKeyId: e.target.value})}
      />
      <input 
        placeholder="Razorpay Key Secret"
        type="password"
        value={paymentConfig.razorpayKeySecret}
        onChange={(e) => setPaymentConfig({...paymentConfig, razorpayKeySecret: e.target.value})}
      />
      <input 
        placeholder="UPI ID (e.g., restaurant@ybl)"
        value={paymentConfig.upiId}
        onChange={(e) => setPaymentConfig({...paymentConfig, upiId: e.target.value})}
      />
      <button onClick={handleSave}>Save Configuration</button>
    </div>
  );
};
```

## Next Steps

1. Add payment configuration fields to restaurant model
2. Update payment routes to use restaurant-specific credentials
3. Update frontend components to pass restaurant ID
4. Add payment settings page to restaurant dashboard
5. Test with multiple restaurant accounts
6. Document for restaurant owners
