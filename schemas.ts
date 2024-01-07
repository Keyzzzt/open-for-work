import { z } from 'zod'

export const categorySchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(2, 'Description is required'),
})
export type TCategorySchema = z.infer<typeof categorySchema>

export const faqCategorySchema = z.object({
  title: z.string().min(2, 'Title is required'),
})
export type TFAQCategorySchema = z.infer<typeof faqCategorySchema>

export const socialsSchema = z.object({
  youtube: z.union([z.literal(''), z.string().trim().url()]),
  facebook: z.union([z.literal(''), z.string().trim().url()]),
  instagram: z.union([z.literal(''), z.string().trim().url()]),
  twitter: z.union([z.literal(''), z.string().trim().url()]),
  tikTok: z.union([z.literal(''), z.string().trim().url()]),
  linkedIn: z.union([z.literal(''), z.string().trim().url()]),
  pinterest: z.union([z.literal(''), z.string().trim().url()]),
})
export type TSocialsSchema = z.infer<typeof socialsSchema>

export const productSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(2, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  countInStock: z.string().min(1, 'Products count is required'),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
})
export type TProductSchema = z.infer<typeof productSchema>

export const newFaqSchema = z.object({
  question: z.string().min(2, 'Field is required'),
  answer: z.string().min(2, 'Field is required'),
})
export type TNewFaqSchema = z.infer<typeof newFaqSchema>

export const configurationSchema = z.object({
  taxRate: z.string().min(1, 'Field is required'),
})
export type TConfigurationSchema = z.infer<typeof configurationSchema>

export const registerSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2, 'Name is required'),
    password: z.string().min(2, 'Password is required'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })
export type TRegisterSchema = z.infer<typeof registerSchema>

export const subscribeSchema = z.object({
  email: z.string().email(),
})

export type TSubscribeSchema = z.infer<typeof subscribeSchema>

export const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  address: z.string().min(4, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  stateProvince: z.string().min(2, 'State / Province is required'),
  postalCode: z.string().min(2, 'Postal code is required'),
  phone: z.string().min(2, 'Phone is required'),
})
export type TCheckoutForm = z.infer<typeof checkoutSchema>

// About page
export const aboutHeroSchema = z.object({
  title: z.string().min(1, 'Field is required'),
  description: z.string().min(1, 'Field is required'),
  disabled: z.boolean(),
})
export type TAboutHeroSchema = z.infer<typeof aboutHeroSchema>

export const aboutTimelineSchema = z.object({
  mainTitle: z.string().min(1, 'Field is required'),
  disabled: z.boolean(),

  date1: z.string().min(1, 'Field is required'),
  dateTime1: z.string().min(1, 'Field is required'),
  title1: z.string().min(1, 'Field is required'),
  description1: z.string().min(1, 'Field is required'),
  disabled1: z.boolean(),

  date2: z.string().min(1, 'Field is required'),
  dateTime2: z.string().min(1, 'Field is required'),
  title2: z.string().min(1, 'Field is required'),
  description2: z.string().min(1, 'Field is required'),
  disabled2: z.boolean(),

  date3: z.string().min(1, 'Field is required'),
  dateTime3: z.string().min(1, 'Field is required'),
  title3: z.string().min(1, 'Field is required'),
  description3: z.string().min(1, 'Field is required'),
  disabled3: z.boolean(),

  date4: z.string().min(1, 'Field is required'),
  dateTime4: z.string().min(1, 'Field is required'),
  title4: z.string().min(1, 'Field is required'),
  description4: z.string().min(1, 'Field is required'),
  disabled4: z.boolean(),
})
export type TTimelineSchema = z.infer<typeof aboutTimelineSchema>

export const aboutMissionSchema = z.object({
  title: z.string().min(1, 'Field is required'),
  description1: z.string().min(1, 'Field is required'),
  description2: z.string().min(1, 'Field is required'),
  description3: z.string().min(1, 'Field is required'),
  goalTitle1: z.string(),
  goalDescription1: z.string(),
  goalTitle2: z.string(),
  goalDescription2: z.string(),
  goalTitle3: z.string(),
  goalDescription3: z.string(),
  disabled: z.boolean(),
})
export type TAboutMissionSchema = z.infer<typeof aboutMissionSchema>

export const aboutTeamSchema = z.object({
  title: z.string().min(1, 'Field is required'),
  description1: z.string().min(1, 'Field is required'),
  description2: z.string().min(1, 'Field is required'),
  disabled: z.boolean(),
})
export type TAboutTeamSchema = z.infer<typeof aboutTeamSchema>

export const aboutValuesSchema = z.object({
  title: z.string().min(1, 'Field is required'),
  description: z.string().min(1, 'Field is required'),
  disabled: z.boolean(),

  title1: z.string().min(1, 'Field is required'),
  description1: z.string().min(1, 'Field is required'),
  disabled1: z.boolean(),

  title2: z.string().min(1, 'Field is required'),
  description2: z.string().min(1, 'Field is required'),
  disabled2: z.boolean(),

  title3: z.string().min(1, 'Field is required'),
  description3: z.string().min(1, 'Field is required'),
  disabled3: z.boolean(),
})
export type TAboutValuesSchema = z.infer<typeof aboutValuesSchema>

export const aboutVacancySchema = z.object({
  title: z.string().min(1, 'Field is required'),
  description: z.string().min(1, 'Field is required'),
  disabled: z.boolean(),

  title1: z.string().min(1, 'Field is required'),
  description1: z.string().min(1, 'Field is required'),
  salary1: z.string().min(1, 'Field is required'),
  city1: z.string().min(1, 'Field is required'),
  disabled1: z.boolean(),

  title2: z.string().min(1, 'Field is required'),
  description2: z.string().min(1, 'Field is required'),
  salary2: z.string().min(1, 'Field is required'),
  city2: z.string().min(1, 'Field is required'),
  disabled2: z.boolean(),

  title3: z.string().min(1, 'Field is required'),
  description3: z.string().min(1, 'Field is required'),
  salary3: z.string().min(1, 'Field is required'),
  city3: z.string().min(1, 'Field is required'),
  disabled3: z.boolean(),
})
export type TAboutVacancySchema = z.infer<typeof aboutVacancySchema>

export const aboutStatisticsSchema = z.object({
  title: z.string().min(1, 'Field is required'),
  description: z.string().min(1, 'Field is required'),
  disabled: z.boolean(),

  title1: z.string().min(1, 'Field is required'),
  description1: z.string().min(1, 'Field is required'),
  result1: z.string().min(1, 'Field is required'),
  disabled1: z.boolean(),

  title2: z.string().min(1, 'Field is required'),
  description2: z.string().min(1, 'Field is required'),
  result2: z.string().min(1, 'Field is required'),
  disabled2: z.boolean(),

  title3: z.string().min(1, 'Field is required'),
  description3: z.string().min(1, 'Field is required'),
  result3: z.string().min(1, 'Field is required'),
  disabled3: z.boolean(),
})
export type TAboutStatisticsSchema = z.infer<typeof aboutStatisticsSchema>

export const blogSchema = z.object({
  title: z.string().min(1, 'Field is required'),
  description: z.string().min(1, 'Field is required'),
  disabled: z.boolean(),
  isAboutSectionDisabled: z.boolean(),
  isLandingSectionDisabled: z.boolean(),
})
export type TBlogSchema = z.infer<typeof blogSchema>

export const storySchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(2, 'Description is required'),
  isFeatured: z.boolean(),
  disabled: z.boolean(),
})
export type TStorySchema = z.infer<typeof storySchema>

// About page
export const faqItemSchema = z.object({
  question: z.string().min(1, 'Field is required'),
  answer: z.string().min(1, 'Field is required'),
})
export type TFaqItemSchema = z.infer<typeof faqItemSchema>

export const faqPageSchema = z.object({
  title: z.string().min(1, 'Field is required'),
  description: z.string().min(1, 'Field is required'),
  disabled: z.boolean(),
})
export type TFaqPageSchema = z.infer<typeof faqPageSchema>

// Landing page schemas
export const landingFeaturedSchema = z.object({
  title: z.string().min(1, 'Field is required'),
  linkTitle: z.string().min(1, 'Field is required'),
  disabled: z.boolean(),
})
export type TLandingFeaturedSchema = z.infer<typeof landingFeaturedSchema>

export const testimonialsSchema = z.object({
  title: z.string().min(1, 'Field is required'),
  disabled: z.boolean(),
})
export type TTestimonialsSchema = z.infer<typeof testimonialsSchema>

export const testimonialItemSchema = z.object({
  content: z.string().min(1, 'Field is required'),
  author: z.string().min(1, 'Field is required'),
  disabled: z.boolean(),
  featured: z.boolean(),
})
export type TTestimonialItemSchema = z.infer<typeof testimonialItemSchema>

export const saleSchema = z.object({
  disabled: z.boolean(),
  title: z.string().min(1, 'Field is required'),
  linkTitle: z.string().min(1, 'Field is required'),
  description: z.string().min(1, 'Field is required'),
})
export type TSaleSchema = z.infer<typeof saleSchema>

export const paragraphSchema = z.object({
  type: z.string().min(1, 'Field is required'),
})
export type TParagraphSchema = z.infer<typeof paragraphSchema>
