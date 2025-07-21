'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOverlayStore } from '@/stores/useOverlay';
import styles from './contactoverlay.module.css'
import useEscapeKey from '@/lib/hooks/useEscapeKey';
import useLockScroll from '@/lib/hooks/useLockScroll';
import useClickOutside from '@/lib/hooks/useClickOutside';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 


type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  message?: string;
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
  const { register, handleSubmit } = useForm<ContactFormData>();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const isContactOpen = useOverlayStore((s) => s.isContactOpen);
  const closeContact = useOverlayStore((s) => s.closeContact);
  const contactOverlayRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(contactOverlayRef, isContactOpen, closeContact);
  

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };
  const onSubmit = (data: ContactFormData) => {
    // On close contact add a loading state or similar-submitting....
    closeContact();
    console.log({ ...data, selectedServices });
  };

  useLockScroll(isContactOpen);
  useEscapeKey(isContactOpen, closeContact);

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

        <div className={styles.services}>
          {services.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              className={`${styles.serviceBtn} ${
                selectedServices.includes(service) ? styles.active : ''
              }`}
            >
              {service}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputRow}>
            <input
              {...register('name')}
              placeholder="Your name"
              className={styles.input}
            />
            <input
              {...register('email')}
              placeholder="Your email"
              className={styles.input}
            />
          </div>
          <input
            {...register('company')}
            placeholder="Your company (optional)"
            className={styles.input}
          />
          <textarea
            {...register('message')}
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
