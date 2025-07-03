import gsap from 'gsap';

export const showNavbar = (element: HTMLElement) => {
  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power2.out',
  });
};

export const hideNavbar = (element: HTMLElement) => {
  return gsap.to(element, {
    opacity: 0,
    y: -60,
    duration: 0.4,
    ease: 'power2.in',
  });
};

export const morphToGlass = (element: HTMLElement) => {
  return gsap.to(element, {
    width: 'clamp(300px, 70%, 700px)',
    borderRadius: '16px',
    backdropFilter: 'blur(35px)',
    backgroundColor: 'rgba(188, 230, 154, 0.35)',
    border: '2px solid rgba(188, 230, 154, 0.45)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    ease: 'power2.out',
    duration: 0.6,
  });
};

export const revertGlass = (element: HTMLElement) => {
  return gsap.to(element, {
    width: '100%',
    borderRadius: '0px',
    backdropFilter: 'blur(0px)',
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    ease: 'power2.out',
    duration: 0.4,
  });
};
