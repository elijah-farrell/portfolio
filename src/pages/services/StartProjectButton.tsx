interface StartProjectButtonProps {
    onGetStarted: () => void;
  }
  
  export default function StartProjectButton({ onGetStarted }: StartProjectButtonProps) {
    return (
      <>
        <section id="contact-form" className="pt-0 pb-20 bg-white dark:bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex justify-center">
              <div className="relative inline-flex p-[3px] rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-[0_0_20px_5px_rgba(16,185,129,0.4)] animate-orbit-glow">
                {/* Button */}
                <button
                  onClick={onGetStarted}
                  className="group inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white px-6 font-medium hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white transition-[background-color] duration-0 hover:duration-300"
                >
                  <span className="group-hover:scale-105 transition-transform duration-300 inline-flex items-center">
                    <span>Start a Project</span>
                    <div className="relative ml-1 h-5 w-5 overflow-hidden">
                      <div className="absolute transition-transform duration-300 group-hover:-translate-y-5 group-hover:translate-x-4">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                          <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -translate-x-4">
                          <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </span>
                </button>
  
                
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  
  
  