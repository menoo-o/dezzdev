'use client'


export default function ContactButton() {

  const handleClick = () => {
    alert('Contact Us button clicked!');
  };

  return (
 <div className="relative inline-block" >
  <button   
    onClick={handleClick}
   className="group relative inline-flex h-10 px-3 md:h-8 md:px-2 items-center justify-center bg-[var(--bg-green)] font-normal text-neutral-200">

    <span className="text-[var(--text)] font-light text-sm">Contact</span>
    <div className="ml-1 -rotate-45 transition-all duration-200 group-hover:rotate-0">
      <svg 
        width="15" 
        height="15" 
        viewBox="0 0 15 15" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5">
        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" 
        fill="#18FFC1" fill-rule="evenodd" clip-rule="evenodd">
        </path>
      </svg>
    </div>
  </button>
  </div>
);
}
