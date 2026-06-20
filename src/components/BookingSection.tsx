import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, THERAPISTS } from '../data';
import { Service, Therapist, Package, BookingDetails } from '../types';
import { 
  Scissors, Paintbrush, Sparkles, Droplet, Smile, Calendar, Clock, User, 
  ArrowRight, ArrowLeft, CheckCircle2, Ticket, ListChecks, History, Trash2, X
} from 'lucide-react';

interface BookingSectionProps {
  preselectedService?: Service | null;
  preselectedTherapist?: Therapist | null;
  preselectedPackage?: Package | null;
  clearPreselections?: () => void;
  onBookingConfirmed?: (details: BookingDetails) => void;
}

const CATEGORIES = [
  { id: 'HAIR', label: 'Hair Cuts', icon: <Scissors className="w-4 h-4" /> },
  { id: 'COLOR', label: 'Coloring', icon: <Paintbrush className="w-4 h-4" /> },
  { id: 'MAKEUP', label: 'Makeup', icon: <Smile className="w-4 h-4" /> },
  { id: 'SKINCARE', label: 'Skincare', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'SPA', label: 'Spa Treatments', icon: <Droplet className="w-4 h-4" /> },
  { id: 'NAILS', label: 'Nail Craft', icon: <Scissors className="w-4 h-4" /> }
];

// Generates upcoming 14 calendar days
const getUpcomingDays = () => {
  const list = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 1; i <= 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    list.push({
      dateStr: d.toISOString().split('T')[0], // YYYY-MM-DD
      dayName: days[d.getDay()],
      dayNum: d.getDate(),
      monthName: months[d.getMonth()]
    });
  }
  return list;
};

const MORNING_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
const AFTERNOON_SLOTS = ['12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

export default function BookingSection({ 
  preselectedService, 
  preselectedTherapist, 
  preselectedPackage,
  clearPreselections,
  onBookingConfirmed
}: BookingSectionProps) {

  // Current Step
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('HAIR');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  
  // Therapist and Date/Time States
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Personal Credential States
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Local confirmations trace
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);
  const [myReservations, setMyReservations] = useState<BookingDetails[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  const upcomingDays = getUpcomingDays();

  // Load reservations history from cache
  useEffect(() => {
    const cached = localStorage.getItem('luxe_salon_reservations');
    if (cached) {
      try {
        setMyReservations(JSON.parse(cached));
      } catch (err) {
        console.error("Cache reading error:", err);
      }
    }
  }, []);

  // Pre-fill parameters on change
  useEffect(() => {
    if (preselectedService) {
      setSelectedCategory(preselectedService.category);
      setSelectedServiceId(preselectedService.id);
      setStep(2); // Auto advance to date selection
    } else if (preselectedPackage) {
      setSelectedCategory('SPA');
      // Create a simulated service for the package
      setSelectedServiceId(`pkg-${preselectedPackage.id}`);
      setStep(2);
    }

    if (preselectedTherapist) {
      setSelectedTherapistId(preselectedTherapist.id);
    }

    // Set first date available by default
    if (upcomingDays.length > 0) {
      setSelectedDate(upcomingDays[0].dateStr);
    }
  }, [preselectedService, preselectedTherapist, preselectedPackage]);

  // Handle selected service or package pricing
  const getActiveServiceDetails = () => {
    if (selectedServiceId.startsWith('pkg-') && preselectedPackage) {
      return {
        title: `${preselectedPackage.name} Package`,
        price: preselectedPackage.price,
        category: 'SPA'
      };
    }
    const found = SERVICES.find(s => s.id === selectedServiceId);
    if (found) {
      return {
        title: found.title,
        price: found.price,
        category: found.category
      };
    }
    return {
      title: 'Select a Service',
      price: '$0',
      category: selectedCategory
    };
  };

  const getActiveTherapistName = () => {
    if (selectedTherapistId === 'any') return 'Any Master Craftsman';
    const found = THERAPISTS.find(t => t.id === selectedTherapistId);
    return found ? found.name : 'Any Master Craftsman';
  };

  // Validation routines per step
  const canAdvance = () => {
    if (step === 1) {
      return selectedServiceId !== '';
    }
    if (step === 2) {
      return selectedDate !== '' && selectedTime !== '';
    }
    return true;
  };

  const isFormValid = () => {
    return firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && phone.trim() !== '';
  };

  const handleNextStep = () => {
    if (canAdvance() && step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  // Submit flow
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const details = getActiveServiceDetails();
    const finalBooking: BookingDetails = {
      category: details.category,
      serviceId: selectedServiceId,
      therapistId: selectedTherapistId,
      date: selectedDate,
      time: selectedTime,
      price: details.price,
      firstName,
      lastName,
      email,
      phone,
      notes: specialRequests
    };

    // Save locally
    const existing = [...myReservations, finalBooking];
    setMyReservations(existing);
    localStorage.setItem('luxe_salon_reservations', JSON.stringify(existing));

    // Success State
    setConfirmedBooking(finalBooking);

    // Callbacks
    if (onBookingConfirmed) {
      onBookingConfirmed(finalBooking);
    }

    // Reset parameters
    if (clearPreselections) {
      clearPreselections();
    }
  };

  // Remove booking from history
  const handleCancelBooking = (index: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      const updated = myReservations.filter((_, idx) => idx !== index);
      setMyReservations(updated);
      localStorage.setItem('luxe_salon_reservations', JSON.stringify(updated));
    }
  };

  // Helpers to get specific date labels
  const formatDateLabel = (dateStr: string) => {
    const day = upcomingDays.find(d => d.dateStr === dateStr);
    if (day) {
      return `${day.dayName}, ${day.monthName} ${day.dayNum}`;
    }
    return dateStr;
  };

  const activeService = getActiveServiceDetails();

  return (
    <div className="space-y-8 pb-16 relative">
      
      {/* Dynamic Header */}
      {!confirmedBooking && (
        <div className="flex flex-col md:flex-row justify-between items-center bg-zinc-950 p-6 rounded-none border border-white/10 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-white font-black uppercase tracking-tight">Reserve Your Sanctuary</h1>
            <p className="text-xs text-on-surface-variant font-normal mt-1">Our dynamic booking engine processes immediate confirmations with premium therapists.</p>
          </div>
          <button
            onClick={() => setShowHistoryModal(true)}
            className="px-5 py-3 bg-zinc-900 border border-primary/30 text-primary rounded-none text-xs font-sans font-black tracking-[0.15em] uppercase hover:bg-primary/20 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap"
          >
            <History className="w-4 h-4" />
            My Bookings ({myReservations.length})
          </button>
        </div>
      )}

      {/* Main Reservation Suite */}
      {!confirmedBooking ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* STEPPER CONTENT AREA */}
          <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-none border border-white/10 space-y-8 bg-zinc-900/10">
            
            {/* Step Progress Indicators */}
            <div className="flex justify-between items-center pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className={`w-8 h-8 rounded-none flex items-center justify-center text-xs font-mono border ${
                  step >= 1 ? 'border-primary bg-primary text-black font-black' : 'border-white/10 text-zinc-500'
                }`}>
                  1
                </span>
                <span className={`text-[10px] tracking-[0.2em] font-sans font-black uppercase ${step >= 1 ? 'text-white' : 'text-zinc-500'}`}>Treatment</span>
              </div>
              <div className="w-8 md:w-16 h-0.5 bg-white/5" />
              <div className="flex items-center gap-2.5">
                <span className={`w-8 h-8 rounded-none flex items-center justify-center text-xs font-mono border ${
                  step >= 2 ? 'border-primary bg-primary text-black font-black' : 'border-white/10 text-zinc-500'
                }`}>
                  2
                </span>
                <span className={`text-[10px] tracking-[0.2em] font-sans font-black uppercase ${step >= 2 ? 'text-white' : 'text-zinc-500'}`}>Schedule</span>
              </div>
              <div className="w-8 md:w-16 h-0.5 bg-white/5" />
              <div className="flex items-center gap-2.5">
                <span className={`w-8 h-8 rounded-none flex items-center justify-center text-xs font-mono border ${
                  step >= 3 ? 'border-primary bg-primary text-black font-black' : 'border-white/10 text-zinc-500'
                }`}>
                  3
                </span>
                <span className={`text-[10px] tracking-[0.2em] font-sans font-black uppercase ${step >= 3 ? 'text-white' : 'text-zinc-500'}`}>Verify</span>
              </div>
            </div>

            {/* Step 1: Select Category, Service, and Therapist */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* 1A. Select Category */}
                <div className="space-y-3">
                  <label className="text-xs font-sans tracking-[0.2em] text-primary uppercase font-black block">1A. Select Treatment Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSelectedServiceId(''); // Reset selected service
                        }}
                        className={`p-4.5 rounded-none border text-[10px] font-sans tracking-[0.15em] uppercase font-black flex items-center gap-2.5 cursor-pointer transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-primary border-primary text-black'
                            : 'bg-zinc-950/40 border-white/5 text-on-surface-variant hover:border-primary/40'
                        }`}
                      >
                        {cat.icon}
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1B. Select Specific Service */}
                <div className="space-y-3">
                  <label className="text-xs font-sans tracking-[0.2em] text-primary uppercase font-black block">1B. Choose Specific Service</label>
                  
                  {/* Package placeholder warning fallback */}
                  {selectedServiceId.startsWith('pkg-') && preselectedPackage && (
                    <div className="p-4 rounded-none bg-primary/5 border border-primary/20 flex justify-between items-center">
                      <div>
                        <span className="text-[9px] uppercase font-sans tracking-widest text-primary font-black">Featured Package Enrolled</span>
                        <h4 className="text-sm font-serif font-black uppercase tracking-tight text-white">{preselectedPackage.name}</h4>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSelectedServiceId('')}
                        className="text-[10px] font-sans tracking-widest font-black uppercase hover:underline text-primary"
                      >
                        Change service
                      </button>
                    </div>
                  )}

                  {!selectedServiceId.startsWith('pkg-') && (
                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {SERVICES.filter(s => s.category === selectedCategory).map((service) => (
                        <div
                          key={service.id}
                          onClick={() => setSelectedServiceId(service.id)}
                          className={`p-4 rounded-none border flex justify-between items-center cursor-pointer transition-all ${
                            selectedServiceId === service.id
                              ? 'bg-zinc-900/60 border-primary shadow-[0_0_15px_rgba(209,255,0,0.15)]'
                              : 'bg-zinc-950/40 border-white/5 hover:border-white/15'
                          }`}
                        >
                          <div className="space-y-1.5 pr-4">
                            <span className="text-sm font-serif font-black uppercase tracking-tight text-white">{service.title}</span>
                            <p className="text-[11px] text-on-surface-variant font-normal leading-relaxed">{service.description}</p>
                          </div>
                          <span className="text-[11px] font-black font-mono text-white bg-primary text-black px-2.5 py-1">
                            {service.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 1C. Preferred Therapist */}
                <div className="space-y-3">
                  <label className="text-xs font-sans tracking-[0.2em] text-primary uppercase font-black block">1C. Preferred Artisan</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div
                      onClick={() => setSelectedTherapistId('any')}
                      className={`p-3.5 rounded-none border flex items-center justify-between cursor-pointer transition-all ${
                        selectedTherapistId === 'any'
                          ? 'border-primary bg-primary/10'
                          : 'border-white/5 bg-zinc-950/20 hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-none bg-neutral-900 border border-white/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="text-xs text-white font-black uppercase tracking-tight">No Preference</span>
                          <span className="text-[9px] text-primary/8 font-bold font-sans uppercase tracking-wider">Recommended</span>
                        </div>
                      </div>
                    </div>

                    {THERAPISTS.map((therapist) => (
                      <div
                        key={therapist.id}
                        onClick={() => setSelectedTherapistId(therapist.id)}
                        className={`p-3.5 rounded-none border flex items-center justify-between cursor-pointer transition-all ${
                          selectedTherapistId === therapist.id
                            ? 'border-primary bg-primary/10'
                            : 'border-white/5 bg-zinc-950/20 hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <img
                            src={therapist.image}
                            alt={therapist.name}
                            className="w-9 h-9 rounded-none object-cover border border-white/20 p-0.5 bg-neutral-900"
                          />
                          <div className="truncate">
                            <span className="text-xs text-white font-black uppercase tracking-tight truncate block">{therapist.name}</span>
                            <span className="text-[8px] text-primary tracking-wider font-sans font-black block uppercase truncate">{therapist.title}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time Scheduler */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* 2A. Day Scroller */}
                <div className="space-y-3">
                  <label className="text-xs font-sans tracking-[0.2em] text-primary uppercase font-black block">2A. Select Appointment Date</label>
                  <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                    {upcomingDays.map((day) => (
                      <button
                        key={day.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(day.dateStr)}
                        className={`flex flex-col items-center justify-center p-3 rounded-none border min-w-[75px] shrink-0 transition-all cursor-pointer ${
                          selectedDate === day.dateStr
                            ? 'bg-primary border-primary text-black font-black scale-102 shadow-[0_0_15px_rgba(209,255,0,0.35)]'
                            : 'bg-zinc-950/40 border-white/5 text-on-surface hover:border-primary/40'
                        }`}
                      >
                        <span className="text-[9px] tracking-widest uppercase font-sans font-black opacity-80">{day.dayName}</span>
                        <span className="text-lg font-serif font-black my-1">{day.dayNum}</span>
                        <span className="text-[8px] font-mono tracking-widest uppercase opacity-75">{day.monthName}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2B. Time Picker Grids */}
                <div className="space-y-6">
                  {/* Morning Slots */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-sans tracking-[0.25em] text-white/50 uppercase block font-black">Morning Availability</span>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {MORNING_SLOTS.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-3.5 px-1 rounded-none border text-[10px] font-sans font-bold tracking-widest uppercase transition-all text-center cursor-pointer ${
                            selectedTime === time
                              ? 'border-primary bg-primary/20 text-primary font-black'
                              : 'bg-zinc-950/40 border-white/5 text-on-surface-variant hover:border-white/15'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Afternoon Slots */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-sans tracking-[0.25em] text-white/50 uppercase block font-black">Afternoon & Evening Availability</span>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {AFTERNOON_SLOTS.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-3.5 px-1 rounded-none border text-[10px] font-sans font-bold tracking-widest uppercase transition-all text-center cursor-pointer ${
                            selectedTime === time
                              ? 'border-primary bg-primary/20 text-primary font-black'
                              : 'bg-zinc-950/40 border-white/5 text-on-surface-variant hover:border-white/15'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Verify and details form */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-primary/5 rounded-none p-4.5 border border-primary/20 text-xs text-on-surface-variant font-normal leading-relaxed">
                  <span className="font-sans font-black text-white block uppercase tracking-wider mb-1.5">FINAL SECURITY CLEARANCE</span>
                  Please input your verification details to secure the reservation sequence. We never share your personal information.
                </div>

                <form onSubmit={handleConfirmReservation} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-sans tracking-[0.2em] font-black uppercase text-white/60 block">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3.5 text-xs text-white rounded-none input-glass bg-zinc-950 border border-white/10 hover:border-primary focus:border-primary transition-colors font-mono uppercase"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-sans tracking-[0.2em] font-black uppercase text-white/60 block">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3.5 text-xs text-white rounded-none input-glass bg-zinc-950 border border-white/10 hover:border-primary focus:border-primary transition-colors font-mono uppercase"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-sans tracking-[0.2em] font-black uppercase text-white/60 block">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane.doe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 text-xs text-white rounded-none input-glass bg-zinc-950 border border-white/10 hover:border-primary focus:border-primary transition-colors font-mono"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-sans tracking-[0.2em] font-black uppercase text-white/60 block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3.5 text-xs text-white rounded-none input-glass bg-zinc-950 border border-white/10 hover:border-primary focus:border-primary transition-colors font-mono"
                    />
                  </div>

                  {/* Special Requests */}
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-[9px] font-sans tracking-[0.2em] font-black uppercase text-white/60 block">Special Requests / Notes</label>
                    <textarea
                      placeholder="Let us know about color preferences, skin sensitivities, or other accommodations..."
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-4 py-3.5 text-xs text-white rounded-none input-glass resize-none bg-zinc-950 border border-white/10 hover:border-primary focus:border-primary transition-colors font-mono"
                    />
                  </div>

                  {/* Hidden form validation driver */}
                  <button type="submit" className="hidden" id="booking-submit-btn" />
                </form>
              </motion.div>
            )}

            {/* Back & Next Navigation controls */}
            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={handleBackStep}
                disabled={step === 1}
                className={`px-6 py-3.5 rounded-none text-xs font-sans font-black tracking-[0.2em] uppercase border border-white/15 text-on-surface-variant flex items-center gap-2 cursor-pointer transition-colors ${
                  step === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                BACK
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!canAdvance()}
                  className={`px-8 py-3.5 rounded-none text-xs font-sans font-black tracking-[0.2em] uppercase text-black flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                    canAdvance()
                      ? 'bg-primary border-primary hover:translate-x-0.5 font-black shadow-[0_0_15px_rgba(209,255,0,0.35)]'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-transparent'
                  }`}
                >
                  NEXT
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const btn = document.getElementById('booking-submit-btn');
                    if (btn) btn.click();
                  }}
                  disabled={!isFormValid()}
                  className={`px-8 py-4 btn-primary text-xs font-sans font-black tracking-widest uppercase rounded-none cursor-pointer flex items-center gap-2 ${
                    isFormValid() ? 'shadow-[0_0_20px_rgba(209,255,0,0.45)]' : 'opacity-45 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  CONFIRM RESERVATION
                </button>
              )}
            </div>

          </div>

          {/* FLOATING RESERVATION SUMMARY COLUMN INVOICE */}
          <div className="glass-panel p-6 rounded-none space-y-6 lg:sticky lg:top-24 bg-zinc-950 border border-white/10">
            <h3 className="font-serif text-lg text-white font-black uppercase tracking-tight border-b border-white/10 pb-3 flex items-center justify-between">
              <span>Reservation Summary</span>
              <Ticket className="w-4 h-4 text-primary opacity-80" />
            </h3>

            <div className="space-y-4 text-xs font-normal">
              {/* Treatment info */}
              <div className="space-y-1">
                <span className="text-[9px] font-sans font-black tracking-[0.2em] text-on-surface-variant uppercase">REF No. / TREATMENT</span>
                <p className="text-white font-black uppercase tracking-tight text-sm">{activeService.title}</p>
                <span className="text-[9px] text-primary/80 font-mono tracking-[0.2em] uppercase font-black">{activeService.category} SERVICES</span>
              </div>

              {/* Artisan info */}
              <div className="space-y-1 pt-2 border-t border-white/5">
                <span className="text-[9px] font-sans font-black tracking-[0.2em] text-on-surface-variant uppercase font-bold">ARTISAN</span>
                <p className="text-white font-bold flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" />
                  {getActiveTherapistName()}
                </p>
              </div>

              {/* Date & Time info */}
              <div className="space-y-1 pt-2 border-t border-white/5">
                <span className="text-[9px] font-sans font-black tracking-[0.2em] text-on-surface-variant uppercase font-bold">DATE & HOUR</span>
                <p className="text-white font-bold flex items-center gap-2 uppercase font-sans">
                  <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                  {selectedDate ? formatDateLabel(selectedDate) : 'Not scheduled'}
                </p>
                {selectedTime && (
                  <p className="text-white font-bold flex items-center gap-2 uppercase font-sans">
                    <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                    {selectedTime}
                  </p>
                )}
              </div>

              {/* Notes previews */}
              {specialRequests.trim() !== '' && (
                <div className="space-y-1 pt-2 border-t border-white/5 max-h-24 overflow-y-auto">
                  <span className="text-[9px] font-sans font-black tracking-[0.2em] text-on-surface-variant uppercase">SPECIAL DIRECTIVES</span>
                  <p className="text-on-surface-variant text-[11px] font-normal leading-relaxed italic">
                    "{specialRequests}"
                  </p>
                </div>
              )}

              {/* Total Summary invoice */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between items-baseline font-mono text-[10px] tracking-wider uppercase">
                  <span className="text-on-surface-variant">EST. STANDARD FEE</span>
                  <span className="text-white">{activeService.price}</span>
                </div>
                <div className="flex justify-between items-baseline font-mono text-[10px] tracking-wider uppercase">
                  <span className="text-on-surface-variant">BOOKING DEPOSIT (FREE)</span>
                  <span className="text-primary">$0.00</span>
                </div>
                <div className="flex justify-between items-baseline pt-2.5 border-t border-white/10">
                  <span className="text-white font-serif font-black uppercase tracking-tight text-sm">TOTAL SECURED DUE</span>
                  <span className="text-xl font-black font-mono text-primary">{activeService.price}</span>
                </div>
              </div>
            </div>

            {/* Quick safety lock note */}
            <div className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider text-center">
              🔒 SSL Encrypted Client Pass System
            </div>
          </div>

        </div>
      ) : (
        /* CONFIRMED BOOKING SUCCESS STATE PANEL */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto glass-panel p-8 rounded-none text-center space-y-8 border-2 border-primary bg-zinc-950 shadow-[0_0_30px_rgba(209,255,0,0.2)]"
        >
          <div className="w-16 h-16 rounded-none bg-primary/10 border border-primary/45 flex items-center justify-center mx-auto scale-110">
            <CheckCircle2 className="w-8 h-8 text-primary animate-bounceHeading" />
          </div>

          <div className="space-y-2.5">
            <span className="text-[10px] font-sans tracking-[0.25em] text-primary uppercase font-black block">Booking Certified</span>
            <h2 className="text-3xl font-serif text-white font-black uppercase tracking-tight">Your Sanctuary is Reserved</h2>
            <p className="text-xs text-on-surface-variant font-normal max-w-md mx-auto leading-relaxed">
              We have dispatched an email packet to <strong className="text-white font-semibold">{confirmedBooking.email}</strong> detailing your entry and safety guide. Please arrive 10 minutes prior to session.
            </p>
          </div>

          {/* Detailed Receipt Card */}
          <div className="bg-neutral-900 border border-white/10 rounded-none p-6 text-left space-y-4 font-normal text-xs max-w-md mx-auto">
            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
              <span className="font-sans text-[8px] tracking-widest text-on-surface-variant uppercase font-black">PASS REF ID</span>
              <span className="font-mono text-[10px] text-primary font-black">#LX-{(Math.random() * 1000000).toFixed(0)}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[8px] tracking-widest text-on-surface-variant uppercase font-sans font-black block">TREATMENT</span>
              <p className="text-white font-serif font-black uppercase tracking-tight text-sm">{getActiveServiceDetails().title}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[8px] tracking-widest text-on-surface-variant uppercase font-sans font-black block">PRESCRIBED ARTISAN</span>
              <p className="text-white font-semibold">{getActiveTherapistName()}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[8px] tracking-widest text-on-surface-variant uppercase font-sans font-black block">DATE</span>
                <p className="text-white font-semibold font-sans uppercase text-[10px]">{formatDateLabel(confirmedBooking.date)}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] tracking-widest text-on-surface-variant uppercase font-sans font-black block">SECURED HOUR</span>
                <p className="text-white font-semibold font-sans uppercase text-[10px]">{confirmedBooking.time}</p>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-2 border-t border-white/5 font-sans font-black">
              <span className="text-[8px] tracking-widest text-on-surface-variant uppercase">BALANCE PAYABLE IN CLINIC</span>
              <span className="text-primary text-sm font-black font-mono">{confirmedBooking.price}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => setConfirmedBooking(null)}
              className="px-6 py-3.5 btn-primary font-sans text-xs tracking-widest uppercase rounded-none cursor-pointer flex items-center gap-2"
            >
              Book Another Treatment
            </button>
            <button
              onClick={() => {
                setConfirmedBooking(null);
                setShowHistoryModal(true);
              }}
              className="px-6 py-3.5 btn-ghost font-sans text-xs tracking-widest uppercase rounded-none border-primary text-primary hover:bg-primary/10 cursor-pointer"
            >
              Review My Active Bookings
            </button>
          </div>
        </motion.div>
      )}

      {/* MY BOOKINGS HISTORY LIGHTBOX PANEL */}
      <AnimatePresence>
        {showHistoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-md"
            onClick={() => setShowHistoryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="max-w-2xl w-full rounded-none overflow-hidden glass-panel max-h-[85vh] flex flex-col border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* History header */}
              <div className="p-6 bg-zinc-950 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <History className="w-5 h-5 text-primary animate-spinSlow" />
                  <h3 className="font-serif text-lg text-white font-black uppercase tracking-tight">Reservation Passports</h3>
                </div>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="w-8 h-8 rounded-none border border-white/10 hover:border-primary hover:text-black hover:bg-primary transition-colors text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* History Items list */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-zinc-950/40">
                {myReservations.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <ListChecks className="w-12 h-12 text-zinc-700 mx-auto" />
                    <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">You have no active salon bookings stored in your browser cache.</p>
                  </div>
                ) : (
                  myReservations.map((res, idx) => {
                    // Match Service Name
                    const matchingService = SERVICES.find(s => s.id === res.serviceId);
                    const serviceTitle = matchingService ? matchingService.title : (res.serviceId.startsWith('pkg-') ? 'Premium Package' : 'Custom Service');
                    
                    // Match Therapist Name
                    const matchingTherapist = THERAPISTS.find(t => t.id === res.therapistId);
                    const therapistName = matchingTherapist ? matchingTherapist.name : 'Master Craftsman';

                    return (
                      <div
                        key={idx}
                        className="bg-zinc-950 rounded-none p-5 border border-white/10 hover:border-primary/40 transition-colors flex flex-col md:flex-row justify-between gap-4"
                      >
                        <div className="space-y-2.5 text-xs font-normal">
                          <div className="flex items-center gap-2.5">
                            <span className="font-sans text-[8px] bg-primary text-black px-2.5 py-1 rounded-none uppercase font-black tracking-wider">
                              {res.category}
                            </span>
                            <span className="font-sans text-[8px] tracking-widest text-zinc-500 font-bold">REF #LX-{(123450 + idx)}</span>
                          </div>
                          
                          <p className="text-sm text-white font-serif font-black uppercase tracking-tight">{serviceTitle}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-1 text-zinc-300">
                            <span className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-primary opacity-70" />
                              Artisan: {therapistName}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-primary opacity-70" />
                              Date: {formatDateLabel(res.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-primary opacity-70" />
                              Hour: {res.time}
                            </span>
                            <span className="flex items-center gap-1.5 font-bold text-primary">
                              Fee: {res.price}
                            </span>
                          </div>
                        </div>

                        {/* Revoke/Cancel booking */}
                        <div className="flex items-center justify-end md:border-l md:border-white/5 md:pl-5">
                          <button
                            onClick={() => handleCancelBooking(idx)}
                            className="p-3 text-red-400 hover:bg-red-500/10 rounded-none border border-red-500/10 hover:border-red-500 transition-colors cursor-pointer inline-flex items-center gap-1.5 text-[10px] font-sans font-black tracking-widest uppercase"
                            title="Cancel Reservation"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                            Cancel Session
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Close Button footer */}
              <div className="p-4 bg-zinc-950 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="px-6 py-3.5 btn-primary text-xs font-sans font-black tracking-widest uppercase rounded-none cursor-pointer"
                >
                  DONE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
