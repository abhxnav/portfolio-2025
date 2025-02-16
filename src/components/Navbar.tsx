'use client'

import { motion } from 'framer-motion'
import { navLinkVariants, navVariants } from '@/lib/motion'
import Link from 'next/link'
import clsx from 'clsx'
import { useActiveSectionContext } from '@/context/ActiveSectionContext'
import { navLinks } from '@/constants'
import { useState } from 'react'
import Image from 'next/image'
import { AdminLoginModal } from '@/components'

const Navbar = () => {
  const { activeSection, setActiveSection } = useActiveSectionContext()

  const [isMobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="z-50 relative">
      {/* Desktop Navbar */}
      <nav className="fixed top-9 left-[calc(50%-35px)] hidden sm:block">
        <motion.div
          className="flex gap-5 items-center text-base font-medium text-dark-200 rounded-full border border-dark-500 bg-dark-600 backdrop-blur-[6px] bg-opacity-80 py-2 px-4"
          variants={navVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {navLinks.map((link, idx) => (
            <motion.li
              variants={navLinkVariants(idx)}
              initial="hidden"
              whileInView="show"
              className="h-3/4 flex items-center justify-center relative"
              key={link.name}
            >
              <Link
                href={link.path}
                onClick={() => setActiveSection(link.name)}
                className={clsx(
                  'flex w-full items-center justify-center px-3 py-1 hover:text-white hover:-translate-y-1 transition',
                  activeSection === link.name && 'text-white'
                )}
              >
                {link.name}
                {link.name === activeSection && (
                  <motion.span
                    className="bg-dark-500 absolute inset-0 -z-10 rounded-full"
                    layoutId="active"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </motion.div>
      </nav>

      {/* Login Button */}
      <nav className="fixed top-9 left-[calc(50%+290px)] hidden sm:block">
        <motion.div
          className="flex items-center justify-center rounded-full bg-dark-600 border border-dark-500 backdrop-blur-[6px] bg-opacity-80 p-3"
          variants={navVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.li
            variants={navLinkVariants(navLinks.length)}
            initial="hidden"
            whileInView="show"
            className="h-3/4 flex items-center justify-center relative p-1"
          >
            <AdminLoginModal type="desktop" />
          </motion.li>
        </motion.div>
      </nav>

      {/* Mobile Navbar */}
      <div className="sm:hidden fixed top-4 right-4 z-50">
        {!isMobileOpen && (
          <button onClick={() => setMobileOpen(true)}>
            <Image
              src="/assets/icons/menu.svg"
              alt="menu"
              width={20}
              height={20}
            />
          </button>
        )}

        {isMobileOpen && (
          <nav className="fixed inset-0 top-0 bg-dark-700 bg-opacity-95 p-6 flex flex-col items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4"
            >
              <Image
                src="/assets/icons/close.svg"
                alt="close"
                width={20}
                height={20}
              />
            </button>

            {/* Navigation Links */}
            <ul className="flex flex-col items-center space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    onClick={() => {
                      setActiveSection(link.name)
                      setMobileOpen(false)
                    }}
                    className={clsx(
                      'text-lg hover:text-white',
                      activeSection === link.name && 'text-white'
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <AdminLoginModal type="mobile" />
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
