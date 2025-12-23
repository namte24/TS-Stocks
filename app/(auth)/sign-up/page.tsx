'use client'
import {CountrySelectField} from '@/components/forms/CountrySelectField'
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import SelectField from '@/components/forms/selectField'
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constants'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signUpwithEmail } from '@/lib/actions/auth_actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SignUp = () => {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
      defaultValues:{
        fullName: '',
        email: '',
        password: '',
        country: 'US',
        investmentGoals: 'Growth',
        riskTolerance: 'Medium',
        preferredIndustry: 'Technology'
      },
      mode: 'onBlur' 
   })
  const onSubmit = async (data: SignUpFormData) => {
    try{
      const result = await signUpwithEmail(data)

      if(result.success) router.push('/')
    }catch(e) {
      console.error(e)
      toast.error('Sign Up Failed', {
        description: e instanceof Error? e.message : 'Failed to create an account'
      })
    }
  }
  return (
    <>
      <h1 className='form-title'>Sign Up & Personalise</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <InputField name="fullName" label="Full Name"
         placeholder="John Doe" register={register}
          error={errors.fullName} validation={{required: 'Full name required', miniLength: 2}}/>

           <InputField name="email" label="Email"
         placeholder="johndoe@email.com" register={register}
          error={errors.email} validation={{required: 'Email is required', pattern:/^\w+@\w+\.\w+$/, message: "Email address is required"}}/>

           <InputField name="password" label="Password"
         placeholder="Enter Passowrd" register={register}
         type='password'
          error={errors.password} validation={{required: 'Password is required', miniLength: 2}}/>

          <CountrySelectField name="country" label='Country' control={control} error={errors.country}
          required/>
  
          <SelectField 
          name="investementGoals"
          label="Investment Goals"
          placeholder="Select your investment goals"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals} 
          />

            <SelectField 
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance} 
          />

            <SelectField 
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select Preferred Industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry} 
          />
          

        <button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5'>
          {isSubmitting? 'Creating account' : 'Create Account'}
        </button>
        <FooterLink text="Already have an account?" linkText='Sign In' href='/sign-in'/>
      </form>
    </>
  )
}

export default SignUp