"use client";

import type React from "react";
import './ParallaxFooter.css'
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export function ParallaxFooter() {
  const services = [
    "Web Development",
    "SEO",
    "Single Page Applications",
    "Website Maintenance",
    "eCommerce",
    "AI",
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="footer">
      {/* CTA Section */}
      <div className="footer-container">
        <h2 className="footer-heading">Let’s make your vision pixel-perfect.</h2>
        <div className="footer-divider" />

        {/* Main Footer Content */}
        <div className="footer-grid">

        {/* left  Column */}
          <div className="footer-middle">
            <p className="footer-label vertical-label ">/ how we help /</p>
            <div className="footer-services">
              {services.map((service) => (
                <button key={service} className="footer-pill">
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* middle Column */}
          <div className="footer-left">
            <div className="footer-block">
              <p className="footer-label vertical-label">/ Got an Idea? /</p>
              <div className="footer-text">
                <p>Got something to ask about? Or just want to say hi? Feel free to drop us a message via email or the contact form and we will get back to you as soon as possible.</p>
                
              </div>
            </div>
            <div className="footer-block">
              
              <div className="footer-socials">
                <Link href="mailto:menosuper6@gmail.com"><Mail size={25} /></Link>
                <Link href="https://x.com/Thisismeeno" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" stroke="currentColor"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 4l11.733 16H20L8.267 4zm0 16l6.768-6.768m2.46-2.46L20 4"/></svg>
                </Link>
                
              </div>
            </div>
          </div>
          

          {/* right Column */}
          <div className="footer-right">
            <p className="footer-label vertical-label">/ Let’s Build It /</p>
              <form onSubmit={handleNewsletterSubmit} className="footer-form">
                  {/* Name Field */}
                  <input
                    type="text"
                    name="name"
                    placeholder="How should we address you?"
                    required
                    className="footer-input"
                  />

                  {/* Project Field */}
                  <textarea
                    name="project"
                    placeholder="Tell us about your project..."
                    rows={3}
                    required
                    className="footer-textarea"
                  />

                  {/* Email Field */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="footer-input"
                  />

                          {/* Submit Button */}
              <button 
                type="submit" 
                className="footer-submit"
                aria-label="Submit message"
              >
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </form>
          
          
          </div>

        

        </div>

           {/* copyright_dezzdev */}
        <div className="footer-legal">
          <p>© {new Date().getFullYear()} All rights reserved. All bugs forgiven.</p>
          </div>
      </div>
    </footer>
  );
}
