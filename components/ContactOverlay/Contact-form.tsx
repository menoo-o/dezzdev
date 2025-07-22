'use client';

import styles from './contactoverlay.module.css'

import { useRef } from 'react';
import { useForm, Controller } from "react-hook-form"

import { useOverlayStore } from '@/stores/useOverlay';
import useEscapeKey from '@/lib/hooks/useEscapeKey';
import useLockScroll from '@/lib/hooks/useLockScroll';
import useClickOutside from '@/lib/hooks/useClickOutside';

import emailjs from '@emailjs/browser';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
  const { register, handleSubmit, reset , control } = useForm<ContactFormData>();
  // const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const isContactOpen = useOverlayStore((s) => s.isContactOpen);
  const closeContact = useOverlayStore((s) => s.closeContact);
  const contactOverlayRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(contactOverlayRef, isContactOpen, closeContact);
  

  // const toggleService = (service: string) => {
  //   setSelectedServices((prev) =>
  //     prev.includes(service)
  //       ? prev.filter((s) => s !== service)
  //       : [...prev, service]
  //   );
  // };


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
      (result) => {
        console.log('Email sent:', result.text);
        alert('Message sent successfully!');
        reset(); // Reset form fields
        closeContact(); // Optionally reset form here
      },
      (error) => {
        console.error('Email error:', error);
        alert('Something went wrong. Try again later.');
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
        <button className={styles.closeBtn} onClick={closeContact}>
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
            <div className={styles.services}>
              {services.map((service) => (
                <button
                  key={service}
                  type="button"
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
              className={styles.input}
            />
          <input
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+\.\S+$/i, // simple email pattern
            })}
            placeholder="Your email"
            className={styles.input}
          />
          </div>
          <input
            {...register('company', {
              required: false,
              maxLength: 50,
            })}
            placeholder="Your company (optional)"
            className={styles.input}
          />
          <textarea
            {...register('message',{
              required: true,
              minLength: 10,
              maxLength: 500,
            })}
            placeholder="Tell about your project"
            className={styles.textarea}
          />
          <button type="submit" className={styles.submitBtn}>
            Send
          </button>
        </form>
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