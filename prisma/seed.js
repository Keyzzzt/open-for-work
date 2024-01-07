const { PrismaClient } = require('@prisma/client')
const { products } = require('./seedingData.js')
const prisma = new PrismaClient()

async function main() {
  // Create config
  await prisma.config.deleteMany({})
  await prisma.config.create({
    data: {},
  })

  // Create product categories
  const categoriesRaw = [
    {
      title: 'All',
      description: "This category can't be deleted",
    },
    {
      title: 'New products',
      description: 'Edit this category to your needs',
    },
    {
      title: 'Sale',
      description: 'Edit this category to your needs',
    },
  ]

  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.category.createMany({
    data: categoriesRaw,
  })
  const categories = await prisma.category.findMany({})

  // Create default products
  const formattedProducts = products.map((p) => ({
    ...p,
    categoryId: categories[1].id,
  }))
  await prisma.product.deleteMany({})
  await prisma.product.createMany({
    data: formattedProducts,
  })

  // Create About page content
  // About -> Hero
  await prisma.aboutHero.deleteMany({})
  await prisma.aboutHero.create({
    data: {
      title:
        'We’re a passionate group of people working from around the world to build the future of ecommerce.',
      description:
        'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    },
  })

  // About -> Timeline
  await prisma.aboutTimeline.deleteMany({})
  await prisma.aboutTimeline.create({
    data: {
      mainTitle: 'Calendar of our success',
      date1: 'Aug 2020',
      dateTime1: '2020-08',
      title1: 'Company founded',
      description1:
        'Foundation Day is a designated day on which celebrations mark the founding of an organisation or institution.',
      date2: 'Sep 2021',
      dateTime2: '2021-09',
      title2: '1000 clients',
      description2:
        'Foundation Day is a designated day on which celebrations mark the founding of an organisation or institution.',
      date3: 'Dec 2022',
      dateTime3: '2022-12',
      title3: '1000000 euro income',
      description3:
        'Foundation Day is a designated day on which celebrations mark the founding of an organisation or institution.',
      date4: 'Aug 2023',
      dateTime4: '2023-08',
      title4: 'Went to the moon',
      description4:
        'Foundation Day is a designated day on which celebrations mark the founding of an organisation or institution.',
    },
  })

  // About -> Mission
  {
    await prisma.aboutMission.deleteMany({})
    await prisma.aboutMission.create({
      data: {
        title: 'Our mission',
        description1:
          'Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend egestas fringilla sapien.',
        description2:
          'Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.',
        description3:
          'Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.',

        goalTitle1: '44 million',
        goalDescription1: 'Transactions every 24 hours',

        goalTitle2: '$119 trillion',
        goalDescription2: 'Assets under holding',

        goalTitle3: '46,000',
        goalDescription3: 'New users annually',
      },
    })
  }

  // About -> Team
  {
    await prisma.aboutTeam.deleteMany({})
    const team = {
      title: 'Our team',
      description1:
        'Quasi est quaerat. Sit molestiae et. Provident ad dolorem occaecati eos iste. Soluta rerum quidem minus ut molestiae velit error quod. Excepturi quidem expedita molestias quas.',
      description2:
        'Quasi est quaerat. Sit molestiae et. Provident ad dolorem occaecati eos iste. Soluta rerum quidem minus ut molestiae velit error quod. Excepturi quidem expedita molestias quas.',
    }
    await prisma.aboutTeam.create({
      data: team,
    })
  }

  // About -> Values
  {
    await prisma.aboutValues.deleteMany({})
    await prisma.aboutValues.create({
      data: {
        title: 'Our values',
        description:
          'Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.',

        title1: 'Be world-class',
        description1:
          'Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.',
        title2: 'Be world-class',
        description2:
          'Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.',
        title3: 'Be world-class',
        description3:
          'Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.',
      },
    })
  }

  // About -> Partners
  {
    await prisma.aboutPartners.deleteMany({})
    await prisma.aboutPartners.create({
      data: {
        title: 'Trusted by the world’s most innovative teams',
      },
    })
  }

  // About -> Statistics
  {
    await prisma.aboutStatistics.deleteMany({})
    await prisma.aboutStatistics.create({
      data: {
        title: 'We approach the workplace',
        description:
          'Diam nunc lacus lacus aliquam turpis enim. Eget hac velit est euismod lacus. Est non placerat nam arcu. Cras purus nibh cursus sit eu in id. Integer vel nibh.',
        result1: '250k',
        title1: 'Users on the platform',
        description1: 'Vel labore deleniti veniam consequuntur sunt nobis.',

        result2: '$8.9 billion',
        title2: 'We’re proud that our customers have made over $8 billion',
        description2:
          'Eu duis porta aliquam ornare. Elementum eget magna egestas.',

        result3: '401,093',
        title3: 'Transactions this year',
        description3:
          'Eu duis porta aliquam ornare. Elementum eget magna egestas. Eu duis porta aliquam ornare.',
      },
    })
  }

  // About -> Vacancies
  {
    await prisma.aboutVacancies.deleteMany({})
    await prisma.aboutVacancies.create({
      data: {
        title: 'Join us today',
        description:
          'Diam nunc lacus lacus aliquam turpis enim. Eget hac velit est euismod lacus. Est non placerat nam arcu. Cras purus nibh cursus sit eu in id.',

        title1: 'Full-time designer',
        description1:
          'Quos sunt ad dolore ullam qui. Enim et quisquam dicta molestias. Corrupti quo voluptatum eligendi autem labore.',
        salary1: '$75,000 USD',
        city1: 'San Francisco, CA',

        title2: 'Full-time designer',
        description2:
          'Quos sunt ad dolore ullam qui. Enim et quisquam dicta molestias. Corrupti quo voluptatum eligendi autem labore.',
        salary2: '$75,000 USD',
        city2: 'San Francisco, CA',

        title3: 'Full-time designer',
        description3:
          'Quos sunt ad dolore ullam qui. Enim et quisquam dicta molestias. Corrupti quo voluptatum eligendi autem labore.',
        salary3: '$75,000 USD',
        city3: 'San Francisco, CA',
      },
    })
  }

  // About -> Blog
  {
    await prisma.blogPage.deleteMany({})
    const blogItems = [
      {
        title: 'Best table ever made',
        description:
          'Keep your phone, keys, and wallet together, so you can lose everything at once.',
        isFeatured: true,
      },
      {
        title: 'Handcrafted Collection',
        description:
          'Keep your phone, keys, and wallet together, so you can lose everything at once.',
        isFeatured: true,
      },
      {
        title: 'Handcrafted Collection',
        description:
          'Keep your phone, keys, and wallet together, so you can lose everything at once.',
        isFeatured: true,
      },
      {
        title: 'Handcrafted Collection',
        description:
          'Keep your phone, keys, and wallet together, so you can lose everything at once.',
        isFeatured: false,
      },
      {
        title: 'Handcrafted Collection',
        description:
          'Keep your phone, keys, and wallet together, so you can lose everything at once.',
        isFeatured: false,
      },
    ]

    await prisma.blogPage.create({
      data: {
        title: 'Check our blog stories',
        description:
          'Each season, we collaborate with world-class designers to create a collection inspired by the natural world.',
        blogItems: {
          createMany: {
            data: blogItems,
          },
        },
      },
    })
  }

  // Create FAQ page content
  {
    const faqCategories = [
      { title: 'All' },
      { title: 'Shipping' },
      { title: 'Payment' },
      { title: 'Returns' },
      { title: 'Defects' },
      { title: 'VAT and custom duties' },
      { title: 'Other' },
    ]

    await prisma.faqPage.deleteMany({})
    await prisma.faqCategory.deleteMany({})
    await prisma.faqCategory.createMany({
      data: faqCategories,
    })

    const shipping = await prisma.faqCategory.findFirst({
      where: { title: 'Shipping' },
    })

    const payment = await prisma.faqCategory.findFirst({
      where: { title: 'Payment' },
    })

    await prisma.faqPage.create({
      data: {
        title: 'Frequently asked questions',
        description:
          'Have a different question and can’t find the answer you’re looking for? Reach out to our support team by sending us an email and we’ll get back to you as soon as we can.',
        faqItems: {
          createMany: {
            data: [
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: payment.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: payment.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
              {
                question:
                  'May I purchase the item now and initiate my 14 days to return it when baby is born?',
                answer:
                  'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
                categoryId: shipping.id,
              },
            ],
          },
        },
      },
    })
  }
  // Socials
  {
    await prisma.social.deleteMany({})
    await prisma.social.createMany({
      data: [
        {
          title: 'youtube',
          url: 'https://www.youtube.com/@RemiMeisner',
        },
        {
          title: 'facebook',
        },
        {
          title: 'twitter',
        },
        {
          title: 'instagram',
        },
        {
          title: 'linkedIn',
          url: 'https://www.linkedin.com/in/igor-akeljev-3898b0204/',
        },
        {
          title: 'pinterest',
        },
        {
          title: 'tikTok',
        },
      ],
    })
  }

  // Landing page
  {
    // Hero section
    // Featured products section
    await prisma.landingFeaturedProducts.deleteMany({})
    await prisma.landingFeaturedProducts.create({
      data: {
        title: 'Trending Products',
        linkTitle: 'Shop the collection',
      },
    })
    // Testimonials section
    await prisma.landingTestimonials.deleteMany({})
    await prisma.landingTestimonials.create({
      data: {
        title: 'What are people saying?',
        items: {
          createMany: {
            data: [
              {
                content:
                  '1 My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
                author: 'Sarah Peters, New Orleans',
              },
              {
                content:
                  '2 My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
                author: 'Sarah Peters, New Orleans',
              },
              {
                content:
                  '3 My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
                author: 'Sarah Peters, New Orleans',
              },
            ],
          },
        },
      },
    })
    // Discounts section
    // Sales section
    await prisma.landingSale.deleteMany({})
    await prisma.landingSale.create({
      data: {
        title: 'Get 25% off during our one-time sale',
        description:
          "Most of our products are limited releases that won't come back. Get your favorite items while they're in stock.",
        linkTitle: 'Get access to our one-time sale',
      },
    })
  }

  // const shippingFaqCategory = await prisma.faqCategory.findUnique({
  //   where: {
  //     title: 'Shipping',
  //   },
  // })
  // if (shippingFaqCategory) {
  //   const faqs = [
  //     {
  //       question: 'How long does it take to ship my order?',
  //       answer:
  //         'We ship all orders within 24 hours. Delivery time depends on your location. You can find more information about shipping in our shipping policy.',
  //       categoryId: shippingFaqCategory.id,
  //     },
  //     {
  //       question:
  //         'May I purchase the item now and initiate my 14 days to return it when baby is born?',
  //       answer:
  //         'As soon as you receive your items, you always have 14 days to return them for a full refund. We are not in a position to delay or adjust that period. We certainly understand that you wish to have everything ready for baby, but we are not able to adjust the 14-day period according to baby’s expected arrival date.',
  //       categoryId: shippingFaqCategory.id,
  //     },
  //   ]
  //   await prisma.faq.createMany({
  //     data: faqs,
  //   })
  // }

  console.log('SUCCESS')
}

main()
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
  .finally(async () => {
    prisma.$disconnect()
  })
