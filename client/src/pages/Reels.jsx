import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, X, Plus, Minus, CreditCard, Smartphone, MapPin, Volume2, VolumeX } from 'lucide-react';
import axios from 'axios';

export default function Reels() {
  const [reels, setReels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    paymentMethod: 'upi'
  });
  const [showPayment, setShowPayment] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef(null);
  const videoRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchReels();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / itemHeight);
      
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        if (reels[newIndex]) {
          incrementView(reels[newIndex]._id);
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, reels]);

  const fetchReels = async () => {
    try {
      const { data } = await axios.get('/api/reels');
      setReels(data);
    } catch (error) {
      console.error('Error fetching reels:', error);
    }
  };

  const incrementView = async (reelId) => {
    try {
      await axios.patch(`/api/reels/${reelId}/view`);
    } catch (error) {
      console.error('Error incrementing view:', error);
    }
  };

  const handleLike = async (reelId) => {
    try {
      await axios.patch(`/api/reels/${reelId}/like`);
      setReels(reels.map(r => 
        r._id === reelId ? { ...r, likes: r.likes + 1 } : r
      ));
    } catch (error) {
      console.error('Error liking reel:', error);
    }
  };

  const openOrderModal = (reel) => {
    setSelectedReel(reel);
    setQuantity(1);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
    setShowPayment(false);
    setSelectedReel(null);
    setQuantity(1);
    setOrderForm({
      customerName: '',
      customerPhone: '',
      deliveryAddress: '',
      paymentMethod: 'upi'
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const confirmPayment = async () => {
    try {
      const orderData = {
        restaurantId: selectedReel.restaurantId._id,
        items: [{
          menuItemId: selectedReel._id,
          name: selectedReel.dishName,
          price: selectedReel.price,
          quantity: quantity
        }],
        totalAmount: selectedReel.price * quantity,
        orderType: 'delivery',
        ...orderForm,
        paymentStatus: 'paid'
      };

      await axios.post('/api/orders', orderData);
      alert('Order placed successfully! 🎉');
      closeOrderModal();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
        >
          <X size={24} />
        </button>
      </div>

      {/* Reels Container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
      >
        {reels.map((reel, index) => (
          <div
            key={reel._id}
            className="h-screen w-screen snap-start relative flex items-center justify-center"
          >
            {/* Video Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
              {reel.videoUrl ? (
                <video
                  ref={(el) => videoRefs.current[reel._id] = el}
                  src={reel.videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay={index === currentIndex}
                  loop
                  muted={isMuted}
                  playsInline
                  controls={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-6xl">🍔</div>
                </div>
              )}
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{reel.dishName}</h2>
              <p className="text-3xl font-bold text-accent mb-2">₹{reel.price}</p>
              
              {reel.restaurantId && (
                <p className="text-lg mb-4">
                  {reel.restaurantId.name} • ⭐ {reel.restaurantId.rating}
                </p>
              )}

              <button
                onClick={() => openOrderModal(reel)}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <ShoppingBag size={20} />
                Order Now
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-6">
              <button
                onClick={() => handleLike(reel._id)}
                className="flex flex-col items-center text-white"
              >
                <div className="bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70">
                  <Heart size={28} fill="white" />
                </div>
                <span className="text-sm mt-1">{reel.likes}</span>
              </button>

              <div className="flex flex-col items-center text-white">
                <div className="bg-black bg-opacity-50 p-3 rounded-full">
                  <span className="text-xl">👁️</span>
                </div>
                <span className="text-sm mt-1">{reel.views}</span>
              </div>
            </div>
          </div>
        ))}

        {reels.length === 0 && (
          <div className="h-screen flex items-center justify-center text-white">
            <div className="text-center">
              <p className="text-2xl mb-4">No reels available</p>
              <button
                onClick={() => navigate('/')}
                className="bg-primary px-6 py-3 rounded-lg hover:bg-red-600"
              >
                Go Home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {showOrderModal && selectedReel && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {!showPayment ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Quick Order</h2>
                  <button onClick={closeOrderModal} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>
                </div>

                {/* Dish Info */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedReel.dishName}</h3>
                  <p className="text-gray-600 mb-2">{selectedReel.restaurantId.name}</p>
                  <p className="text-2xl font-bold text-primary">₹{selectedReel.price}</p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-3">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                {/* Order Form */}
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={orderForm.customerName}
                      onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      value={orderForm.customerPhone}
                      onChange={(e) => setOrderForm({...orderForm, customerPhone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <MapPin size={18} />
                      Delivery Address
                    </label>
                    <textarea
                      required
                      value={orderForm.deliveryAddress}
                      onChange={(e) => setOrderForm({...orderForm, deliveryAddress: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows="3"
                      placeholder="Enter your delivery address"
                    />
                  </div>

                  {/* Total */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{selectedReel.price * quantity}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-semibold">₹40</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Taxes (5%)</span>
                      <span className="font-semibold">₹{Math.round((selectedReel.price * quantity) * 0.05)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-xl font-bold text-primary">
                        ₹{selectedReel.price * quantity + 40 + Math.round((selectedReel.price * quantity) * 0.05)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-600 font-semibold text-lg"
                  >
                    Proceed to Payment
                  </button>
                </form>
              </div>
            ) : (
              /* Payment Screen */
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
                  <button onClick={closeOrderModal} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Total Amount</p>
                  <p className="text-3xl font-bold text-primary">
                    ₹{selectedReel.price * quantity + 40 + Math.round((selectedReel.price * quantity) * 0.05)}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={orderForm.paymentMethod === 'upi'}
                      onChange={(e) => setOrderForm({...orderForm, paymentMethod: e.target.value})}
                    />
                    <Smartphone size={24} className="text-primary" />
                    <span className="font-semibold">UPI Payment</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={orderForm.paymentMethod === 'card'}
                      onChange={(e) => setOrderForm({...orderForm, paymentMethod: e.target.value})}
                    />
                    <CreditCard size={24} className="text-primary" />
                    <span className="font-semibold">Card Payment</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPayment(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={confirmPayment}
                    className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-red-600 font-semibold"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
