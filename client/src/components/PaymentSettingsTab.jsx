import { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';
import axios from 'axios';

export default function PaymentSettingsTab({ restaurant, setRestaurant }) {
  const [settings, setSettings] = useState({
    upiId: '',
    upiName: '',
    acceptCash: true,
    acceptUPI: false
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (restaurant?.paymentSettings) {
      setSettings(restaurant.paymentSettings);
    }
  }, [restaurant]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage('');
      
      const { data } = await axios.patch(
        `/api/restaurants/${restaurant._id}/payment-settings`,
        settings
      );
      
      // Update local storage
      localStorage.setItem('restaurant', JSON.stringify(data));
      setRestaurant(data);
      
      setMessage('Payment settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving payment settings:', error);
      setMessage('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Success Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('success') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          💳 Accepted Payment Methods
        </h2>
        
        <div className="space-y-4">
          {/* Cash on Delivery */}
          <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
            <input
              type="checkbox"
              checked={settings.acceptCash}
              onChange={(e) => setSettings({...settings, acceptCash: e.target.checked})}
              className="w-5 h-5 accent-primary"
            />
            <CreditCard size={24} className="text-primary" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-white">Cash on Delivery</p>
              <p className="text-sm text-gray-600">Accept cash payments from customers</p>
            </div>
          </label>

          {/* UPI Payment */}
          <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
            <input
              type="checkbox"
              checked={settings.acceptUPI}
              onChange={(e) => setSettings({...settings, acceptUPI: e.target.checked})}
              className="w-5 h-5 accent-primary"
            />
            <CreditCard size={24} className="text-primary" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-white">UPI Payment</p>
              <p className="text-sm text-gray-600">Accept online UPI payments</p>
            </div>
          </label>
        </div>
      </div>

      {/* UPI Details */}
      {settings.acceptUPI && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📱 UPI Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                UPI ID
              </label>
              <input
                type="text"
                value={settings.upiId}
                onChange={(e) => setSettings({...settings, upiId: e.target.value})}
                placeholder="yourname@paytm"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter your UPI ID (e.g., yourname@paytm, yourname@phonepe)
              </p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Account Holder Name
              </label>
              <input
                type="text"
                value={settings.upiName}
                onChange={(e) => setSettings({...settings, upiName: e.target.value})}
                placeholder="Restaurant Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving || (!settings.acceptCash && !settings.acceptUPI)}
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-600 font-semibold text-lg transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {saving ? 'Saving...' : 'Save Settings'}
      </button>

      {!settings.acceptCash && !settings.acceptUPI && (
        <p className="text-center text-red-600 mt-4">
          Please enable at least one payment method
        </p>
      )}
    </div>
  );
}
