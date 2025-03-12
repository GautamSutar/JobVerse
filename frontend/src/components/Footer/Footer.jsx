import React from 'react'

function Footer() {
  return (
    <>
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h2 className="text-white text-lg font-bold mb-3">Skill Check</h2>
            <p className="text-gray-400 text-sm">
              AI-powered interview platform that enhances hiring and skill-building.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="text-white text-lg font-bold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/home" className="hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="/features" className="hover:text-white transition">Features</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="text-white text-lg font-bold mb-3">Resources</h2>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition">Blog</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">FAQs</a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">Privacy Policy</a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Column 4 - connect with us */}
          <div>
          <h2 className="text-white text-lg font-bold mb-3">Connect With Us</h2>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a class="text-gray-400">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-400">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-400">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-400">
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
      </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Skill Check. All rights reserved.
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer