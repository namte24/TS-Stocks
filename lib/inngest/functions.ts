
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { sendWelcomeEmail } from "../nodemailer";

export const sendSignUpEmail = inngest.createFunction(
    {id: 'Sign-up-email'},
    {event: 'app/user.created'},

    async({event, step}) =>{
        const userProfile = `
        -Country: ${event?.data.country}
        -Investment goals: ${event.data.investmenGoals}
        -Risk Tolerance: ${event.data.riskTolerance}
        -Preferred Industry: ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        console.log('Prompt being sent to Gemini:', prompt);

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({model: 'gemini-2.5-flash-lite'}),
            body:{
                contents: [
                    {
                        role: 'user',
                        parts: [{text: prompt}]
                    }
                ]
            }
        }).catch(err => {
            console.error(err)
            return null;
        })

        if(!response) {
            return {
                success: false,
                message: 'Failed to generate welcome email'
            }
        }

        await step.run('send-welcome-email', async () =>{
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part? part.text: null) || 'Thankyou for joining! You now have the tools to track the market and make intelligent investments'
            
            const {data: {email, name}} = event
            return await sendWelcomeEmail({email, name, intro: introText})
        })

        return {
            success: true,
            message: 'Welcome email sent successfully'
        }
    }

)