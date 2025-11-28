import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Lock, Mail, ArrowLeft, Edit2, Save, X } from 'lucide-react';
import axios from 'axios';
import { App as CapacitorApp } from '@capacitor/app';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle Android back button
  useEffect(() => {
    const backButtonListener = CapacitorApp.addListener('backButton', (data) => {
      window.location.href = '/';
    });

    return () => {
      backButtonListener.remove();
    };
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const { data } = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(data);
      setFormData({
        name: data.name || '',
        username: data.username || '',
        phone: data.phone || '',
        address: data.address || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      // Validate password change if attempted
      if (formData.newPassword) {
        if (!formData.currentPassword) {
          setError('Current password is required to change password');
          setSaving(false);
          return;
        }
        if (formData.newPassword.length < 6) {
          setError('New password must be at least 6 characters');
          setSaving(false);
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setError('New passwords do not match');
          setSaving(false);
          return;
        }
      }

      const token = localStorage.getItem('userToken');
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      };

      // Add password fields if changing password
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const { data } = await axios.put('/api/users/profile', updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    setFormData({
      name: user.name || '',
      username: user.username || '',
      phone: user.phone || '',
      address: user.address || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.location.href = '/'}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Edit2 size={24} className="text-primary" />
              </button>
            ) : (
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-700 dark:text-gray-300" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold flex items-center gap-2">
              <User size={18} />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
            />
          </div>

          {/* Username (Read-only) */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold flex items-center gap-2">
              <Mail size={18} />
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              disabled
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Username cannot be changed</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold flex items-center gap-2">
              <Phone size={18} />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold flex items-center gap-2">
              <MapPin size={18} />
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={!isEditing}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
              placeholder="Enter your delivery address"
            />
          </div>

          {/* Change Password Section */}
          {isEditing && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Lock size={20} />
                Change Password (Optional)
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter new password (min 6 characters)"
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          {isEditing && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-600 font-semibold text-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
