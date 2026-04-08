import { z } from "zod";

export const trialSignupSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  practiceName: z.string().min(2, "Please enter your practice name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Required"),
  providers: z.string().min(1, "Please select"),
  // Plan selection (Options AI–style) — annual or monthly
  plan: z.enum(["annual", "monthly"], {
    errorMap: () => ({ message: "Please choose a plan" }),
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to start your trial" }),
  }),
});

export type TrialSignupData = z.infer<typeof trialSignupSchema>;
