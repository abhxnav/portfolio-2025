'use client'

import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/components/ui'
import { VerifyCode } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'

interface AdminLoginModalProps {
  type?: 'desktop' | 'mobile'
}

const phoneSchema = z.string()
const otpSchema = z
  .string()
  .length(6, { message: 'Code must be 6 digits long' })

const AdminLoginModal = ({ type = 'desktop' }: AdminLoginModalProps) => {
  const adminPhoneConst = process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER

  const [step, setStep] = useState<'send' | 'verify'>('send')
  const [adminPhone, setAdminPhone] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSendOtp = async () => {
    setLoading(true)

    try {
      phoneSchema.parse(adminPhone)
      setError('')

      if (adminPhone !== adminPhoneConst) {
        setError('Invalid admin phone number')
        return
      }

      // TODO: sendOTP()
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0]?.message || 'Invalid input')
      } else {
        setError('Failed to send the verification code. Please try again.')
        console.error('Failed to send the verification code: ', error)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setLoading(true)

    try {
      otpSchema.parse(otp)
      setError('')

      // TODO: verifyOtp()
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0]?.message || 'Invalid input')
      } else {
        setError('Failed to verify the code. Please try again.')
        console.error('Error verifying otp: ', error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link href="#" className="flex items-center justify-center">
          {type === 'desktop' ? (
            <Image
              src="/assets/icons/admin.svg"
              alt="Admin"
              width={15}
              height={15}
            />
          ) : (
            <span className="text-lg hover:text-white">Admin Login</span>
          )}
        </Link>
      </DialogTrigger>
      <DialogContent className="bg-dark-700 outline-none border-2 border-dark-500">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Admin Login
          </DialogTitle>
          {step === 'send' ? (
            <DialogDescription>
              <div className="flex flex-col gap-2 py-5">
                <Label htmlFor="phone" className="text-base text-dark-300">
                  Admin phone number (without country code)
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter admin phone number"
                  onChange={(e) => setAdminPhone(e.target.value)}
                  className="bg-dark-600 border border-dark-500 text-dark-200 placeholder:text-dark-500 !text-base !p-5"
                />
                {error && <p className="text-red-500">{error}</p>}

                <Button
                  variant="default"
                  className="mt-2"
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  <div className="flex items-center justify-center gap-2">
                    {loading && <Loader2 className="animate-spin" />}
                    <span>Send verification code</span>
                  </div>
                </Button>
              </div>
            </DialogDescription>
          ) : (
            <DialogDescription>
              <div className="flex flex-col gap-2 py-5">
                <div className="py-5">
                  <VerifyCode otp={otp} setOtp={setOtp} />
                  {error && (
                    <p className="text-red-500 mt-2 text-center">{error}</p>
                  )}
                </div>

                <Button
                  variant="default"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  <div className="flex items-center justify-center gap-2">
                    {loading && <Loader2 className="animate-spin" />}
                    <span>Login as Admin</span>
                  </div>
                </Button>
              </div>
            </DialogDescription>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AdminLoginModal
