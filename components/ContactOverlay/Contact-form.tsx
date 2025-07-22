'use client';

import styles from './contactoverlay.module.css'

import { useRef, useState } from 'react';
import { useForm, Controller } from "react-hook-form"

import { useOverlayStore } from '@/stores/useOverlay';
import useEscapeKey from '@/lib/hooks/useEscapeKey';
import useLockScroll from '@/lib/hooks/useLockScroll';
import useClickOutside from '@/lib/hooks/useClickOutside';

import emailjs from '@emailjs/browser';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SpinnerLoader from '@/ui/SpinnerGSAP/Spinner';

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 

type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  message: string;
  selectedServices: string[];
};

const services = [
  'Web Design',
  'Web Development',
  'Web App',
  'E-commerce',
  'SEO',
  'Other',
];


export default function ContactOverlay() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(''); 
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  // 🔹 React Hook Form setup
  const { register, handleSubmit, reset , control, formState:{errors}, } = useForm<ContactFormData>({
    defaultValues:{
      name: '',
      email: '',
      company: '',
      message: '',
      selectedServices: [], 
    }
  });
  const isContactOpen = useOverlayStore((s) => s.isContactOpen);
  const closeContact = useOverlayStore((s) => s.closeContact);
  const contactOverlayRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(contactOverlayRef, isContactOpen, closeContact);

const onSubmit = (data: ContactFormData) => {
  const templateParams = {
    name: data.name,
    email: data.email,
    company: data.company || 'N/A',
    message: data.message,
    selectedServices: data.selectedServices.join(', '), // <- include this!
  };

  emailjs
    .send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
    .then(
      () => {
        setIsSubmitting(true);
       
        setStatusMsg('✅ Message sent successfully!');
        // setStatusMsg(null); // clear previous
        reset({
          name: '',
          email: '',
          company: '',
          message: '',
          selectedServices: [],
        }); // Reset form fields
        closeContact(); // Optionally reset form here
      },
      () => {   
        setStatusType('error');
        setStatusMsg('❌ Something went wrong. Please try again.');
        closeContact(); // Close overlay on error
      }
    );
};

  useLockScroll(isContactOpen);
  useEscapeKey(isContactOpen, closeContact);

  

  // ✅ Only now: short-circuit rendering
  if (!isContactOpen) return null;

  return (
    <section 
      className={`${styles.overlay} ${isContactOpen ? styles.active : ''}`}
      
    >
      <div className={styles.panel} ref={contactOverlayRef}>
        <button 
          className={styles.closeBtn} 
          onClick={closeContact}
          aria-label="Close contact form"
          >
          &times;
        </button>

        <h1 className={styles.title}>Let’s get started</h1>
        <p className={styles.subtitle}>What services are you interested in?</p>

      <Controller
        control={control}                         // comes from useForm()
        name="selectedServices"                  // the field name to register
        rules={{                                 // validation rules
          validate: v => v.length > 0 || "Please select at least one service."
        }}
        render={({ field, fieldState }) => (     // the custom rendering logic
          <>
            <div 
              className={`${styles.services} ${
             fieldState.error ? styles.servicesError : ''
            }`}
             >
              {services.map((service) => (
                <button
                  key={service}
                  type="button"
                   aria-pressed={field.value.includes(service)}
                  aria-label={`Select service ${service}`}
                  onClick={() => {
                    const updated = field.value.includes(service)
                      ? field.value.filter((s: string) => s !== service)
                      : [...field.value, service];
                    field.onChange(updated);    // update RHF value manually
                  }}
                  className={`${styles.serviceBtn} ${
                    field.value.includes(service) ? styles.active : ''
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
            {fieldState.error && (
              <p className={styles.error}>{fieldState.error.message}</p>
            )}
          </>
        )}
      />


        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputRow}>
            <input
              {...register('name', {
                required: true, 
                maxLength: 50
              })}
              placeholder="Your name"
              aria-label="Your name"
              aria-invalid={errors.name ? "true" : "false"}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            />
          <input
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+\.\S+$/i, // simple email pattern
            })}
            placeholder="Your email"
            aria-label="Your Email"
            aria-invalid={errors.email ? "true" : "false"}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          />
          </div>
          <input
            {...register('company', {
              required: false,
              maxLength: 50,
            })}
            placeholder="Your company (optional)"
            aria-label="Your Company"
            className={styles.input}
          />
          <textarea
            {...register('message',{
              required: true,
              minLength: 10,
              maxLength: 500,
            })}
            placeholder="Tell about your project"
            aria-label="Your Message"
            aria-invalid={errors.message ? "true" : "false"}
            className={`${styles.textarea} ${errors.message ? styles.textareaError : ''}`}
          />
          <button 
            type="submit" 
            className={styles.submitBtn}
            aria-label="Send contact message"
            disabled={isSubmitting}
            >
             {isSubmitting ? <SpinnerLoader /> : 'Send'}
          </button>
        </form>
        
        {statusMsg && (
        <p 
          className={
            statusType === 'success' ? styles.successMsg : styles.errorMsg
          }
        >
          {statusMsg}
        </p>
        )}

      </div>
    </section>
  );
}



// useGSAP(() => {
  //   if (!contactOverlayRef.current || !isContactOpen) return;
  //   gsap.fromTo(
  //     contactOverlayRef.current,
  //     { y: -100, opacity: 0 },
  //     { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
  //   );
  // }, { dependencies: [isContactOpen], revertOnUpdate: true });

  // useEffect(() => {
  //   if (!isContactOpen || !contactOverlayRef.current) return;
  //   gsap.to(contactOverlayRef.current, {
  //     y: -100,
  //     opacity: 0,
  //     duration: 0.4,
  //     ease: 'power3.in',
  //     onComplete: () => {
  //       gsap.set(contactOverlayRef.current, { clearProps: 'all' });
  //     },
  //   });
  // }, [isContactOpen]);