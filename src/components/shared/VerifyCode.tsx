'use client'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui'

interface VerifyCodeProps {
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>
}

const VerifyCode = ({ otp, setOtp }: VerifyCodeProps) => {
  const slotStyle =
    'outline-none border border-dark-500 text-dark-200 text-3xl font-semibold p-4 size-12'

  return (
    <div className="flex items-center justify-center">
      <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} className={slotStyle} />
          <InputOTPSlot index={1} className={slotStyle} />
          <InputOTPSlot index={2} className={slotStyle} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} className={slotStyle} />
          <InputOTPSlot index={4} className={slotStyle} />
          <InputOTPSlot index={5} className={slotStyle} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}

export default VerifyCode
