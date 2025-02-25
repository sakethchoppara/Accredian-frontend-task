import React, { useState } from 'react';
import { Gift, X, Users, DollarSign, Trophy, Sparkles, ArrowRight, Star, Heart, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import toast, {Toaster} from 'react-hot-toast';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.referrerName) newErrors.referrerName = 'Required';
    if (!formData.referrerEmail) {
      newErrors.referrerEmail = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.referrerEmail)) {
      newErrors.referrerEmail = 'Invalid email';
    }
    if (!formData.refereeName) newErrors.refereeName = 'Required';
    if (!formData.refereeEmail) {
      newErrors.refereeEmail = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.refereeEmail)) {
      newErrors.refereeEmail = 'Invalid email';
    }
    setErrors(newErrors);
    console.log(newErrors)
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('hiii 1')
    if (validateForm()) {
      console.log('hiii')
      fetch('http://localhost:8000/api/referral/create',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.status){
          console.log(data)
          setIsModalOpen(false);
          setFormData({
            referrerName: '',
            referrerEmail: '',
            refereeName: '',
            refereeEmail: '',
          });
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 pt-0.5">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Referral Sent Successfully!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      We've sent an invitation to {formData.refereeName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ), {
            duration: 5000,
            position: 'top-center',
          });
        }
        else{
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 pt-0.5">
                    <AlertCircle className="h-10 w-10 text-red-500" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Oops! Something went wrong
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Please try again later
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Close
                </button>
              </div>
            </div>
          ), {
            duration: 5000,
            position: 'top-center',
          });
        }
      })
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleModalClick = (e) => {
    // Close modal only if clicking the overlay (not the modal content)
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <Toaster />
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-glass px-6 py-2 rounded-full mb-8 animate-float">
            <div className="relative">
              <Sparkles className="text-indigo-600 animate-pulse-slow" size={20} />
              <div className="absolute inset-0 bg-indigo-400 rounded-full blur animate-pulse-slow" style={{ opacity: 0.3 }}></div>
            </div>
            <span className="text-indigo-900 font-medium">Earn rewards for sharing knowledge</span>
          </div>
          <h1 className="text-7xl font-bold text-indigo-900 mb-6 leading-tight">
            Share & Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Rewards</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join our community of learners and earn exciting rewards by referring your friends. 
            The more you share, the more you earn!
          </p>
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Refer Now 
              <Gift className="inline ml-2 group-hover:rotate-12 transition-transform duration-300" size={20} />
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="group bg-glass p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-20 group-hover:opacity-30"></div>
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 relative">
                <Users className="text-indigo-600 transform group-hover:rotate-12 transition-transform duration-500" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Invite Friends</h3>
            <p className="text-gray-600 leading-relaxed">Share your unique referral link with friends and watch your rewards grow together</p>
          </div>
          <div className="group bg-glass p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-20 group-hover:opacity-30"></div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 relative">
                <DollarSign className="text-purple-600 transform group-hover:rotate-12 transition-transform duration-500" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Earn Rewards</h3>
            <p className="text-gray-600 leading-relaxed">Get exciting rewards and bonuses for every successful referral you make</p>
          </div>
          <div className="group bg-glass p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-indigo-400 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-20 group-hover:opacity-30"></div>
              <div className="bg-gradient-to-br from-pink-100 to-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 relative">
                <Trophy className="text-pink-600 transform group-hover:rotate-12 transition-transform duration-500" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Unlock Benefits</h3>
            <p className="text-gray-600 leading-relaxed">Access exclusive perks and special offers as you climb our referral tiers</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          <div className="bg-glass rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Star className="text-indigo-600" size={24} />
            </div>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">10k+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="bg-glass rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Users className="text-purple-600" size={24} />
            </div>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">50k+</div>
            <div className="text-gray-600">Referrals Made</div>
          </div>
          <div className="bg-glass rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="text-pink-600" size={24} />
            </div>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-600 mb-2">$100k+</div>
            <div className="text-gray-600">Rewards Given</div>
          </div>
          <div className="bg-glass rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Heart className="text-indigo-600" size={24} />
            </div>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">95%</div>
            <div className="text-gray-600">Happy Users</div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 bg-glass rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
            <div className="w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 blur-2xl"></div>
          </div>
          <div className="relative">
            <div className="flex justify-center mb-6">
              <Zap className="text-yellow-500" size={32} />
            </div>
            <p className="text-xl text-gray-700 text-center italic mb-6 max-w-3xl mx-auto">
              "The referral program has been amazing! I've earned over $500 in rewards just by sharing courses with my network. The process is seamless, and the rewards are fantastic!"
            </p>
            <div className="text-center">
              <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
              <p className="text-gray-600">Web Development Student</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleModalClick} // Add click handler to the overlay
        >
          <div className="bg-glass rounded-2xl p-8 max-w-md w-full relative transform transition-all">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
                <Gift className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Refer a Friend</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="referrerName"
                  value={formData.referrerName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                    errors.referrerName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your name"
                />
                {errors.referrerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.referrerName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  name="referrerEmail"
                  value={formData.referrerEmail}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                    errors.referrerEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.referrerEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.referrerEmail}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Friend's Name
                </label>
                <input
                  type="text"
                  name="refereeName"
                  value={formData.refereeName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                    errors.refereeName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter friend's name"
                />
                {errors.refereeName && (
                  <p className="text-red-500 text-sm mt-1">{errors.refereeName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Friend's Email
                </label>
                <input
                  type="email"
                  name="refereeEmail"
                  value={formData.refereeEmail}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                    errors.refereeEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter friend's email"
                />
                {errors.refereeEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.refereeEmail}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl mt-6 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                onClick={handleSubmit}
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative">Submit Referral</span>
                <ArrowRight className="relative group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;