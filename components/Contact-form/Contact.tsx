// app/contact/page.tsx
'use client';


// import { useForm } from 'react-hook-form';
// import { useState } from 'react';

// const services = [
//   'UGC',
//   'Brand Photography',
//   'Short-Form Video',
//   'Content Strategy',
//   'Identity',
//   'Account Management',
//   'Other'
// ];

// const budgets = [
//   'Under $500',
//   '$500–$1k',
//   '$1k–$2.5k',
//   '$2.5k–$5k',
//   '$5k+'
// ];

// export default function ContactPage() {
  // const { register, handleSubmit } = useForm();
  // const [selectedServices, setSelectedServices] = useState<string[]>([]);
  // const [selectedBudget, setSelectedBudget] = useState<string>('');

  // const toggleService = (service: string) => {
  //   setSelectedServices(prev =>
  //     prev.includes(service)
  //       ? prev.filter(s => s !== service)
  //       : [...prev, service]
  //   );
  // };

  // const onSubmit = (data: unknown) => {
  //   console.log({ ...data, selectedServices, selectedBudget });
  // };

  // return (
    // <div className={styles.container}>
    //   <p>hello</p>
      {/* <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.heading}>Get <span>in touch</span></h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <label>Full name</label>
            <input {...register('name')} placeholder="Your name" />
          </div>

          <div className={styles.card}>
            <label>Email</label>
            <input {...register('email')} placeholder="you@example.com" />
          </div>

          <div className={styles.card}>
            <label>Company</label>
            <input {...register('company')} placeholder="Company name" />
          </div>

          <div className={styles.cardLarge}>
            <label>Project details</label>
            <textarea {...register('details')} placeholder="Tell me your goals" />
          </div>

          <div className={styles.card}>
            <label>What can I do for you?</label>
            <div className={styles.tagList}>
              {services.map(service => (
                <button
                  type="button"
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`${styles.tag} ${selectedServices.includes(service) ? styles.active : ''}`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <label>Do you have a budget range?</label>
            <div className={styles.tagList}>
              {budgets.map(budget => (
                <button
                  type="button"
                  key={budget}
                  onClick={() => setSelectedBudget(budget)}
                  className={`${styles.tag} ${selectedBudget === budget ? styles.active : ''}`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submit}>
          <span>Submit</span>
        </button>
      </form> */}
//     </div>
//   );
// }

// components/ContactOverlay.tsx

import { useContactOverlay } from '@/stores/useContactOverlay';
import styles from './page.module.css'; // Optional styling

export default function ContactOverlay() {
  const { isOpen, closeOverlay } = useContactOverlay();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-white p-8">
      <button onClick={closeOverlay} className="absolute top-4 right-4">
        Close
      </button>
      <h2>Contact Us</h2>
      <p>This is the contact overlay content.</p>
    </div>
  );
}
