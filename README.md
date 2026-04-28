# After Dusk Events Website

This is the official marketing website for After Dusk Events LLC. It was built for a non-developer owner, so this guide uses plain language throughout. No prior coding experience needed.

---

## Local Preview

To see the site on your computer before pushing changes live:

1. Open Terminal (search "Terminal" in Spotlight on Mac).
2. Type this and press Enter:
   ```
   cd ~/afterduskevents-site
   npm run dev
   ```
3. Open your browser and go to `http://localhost:3000`.
4. The site updates automatically as you save files. When you are done, press `Ctrl + C` in Terminal to stop the server.

---

## Editing Copy (Text Content)

All page text lives in the `app/` folder. Each page has its own file:

| Page | File to edit |
|---|---|
| Home | `app/page.tsx` |
| Packages and pricing | `app/packages/page.tsx` |
| FAQ | `app/faq/faq-accordion.tsx` (the questions and answers) |
| About | `app/about/page.tsx` |
| Contact (form fields) | `app/contact/contact-form.tsx` |
| Privacy Policy | `app/privacy/page.tsx` |
| Terms of Use | `app/terms/page.tsx` |

To edit text, open the file in any text editor (even TextEdit works in plain text mode), find the sentence you want to change, and replace it. Save the file. If the dev server is running, the browser will refresh automatically.

**Tip:** Most text is wrapped in quotes inside JSX, like: `"Your text here"`. Just change what is between the quotes.

---

## Swapping Images

### Hero image (homepage)
The homepage hero currently uses a placeholder photo from Unsplash. To replace it with your own:

1. Name your photo `hero.jpg` (1920px wide or larger recommended).
2. Drop it into the `public/images/` folder (create the `images` folder if it does not exist yet).
3. Open `app/page.tsx`.
4. Find the line that says `src="https://images.unsplash.com/..."`
5. Replace it with `src="/images/hero.jpg"`.
6. Save and check the browser.

### Logo
1. Name your file `logo.png`.
2. Drop it into the `public/` folder (at the root, same level as `public/favicon.ico`).
3. The site will automatically pick it up. The projector icon placeholder in the nav disappears once the real file is present.

### OG image (social media preview card)
1. Create a 1200x630 pixel image.
2. Name it `og-image.jpg`.
3. Drop it into the `public/` folder.

---

## Deploying Updates

Every time you commit and push to the `main` branch on GitHub, Vercel automatically rebuilds and deploys the site. There is nothing extra you need to do. The process takes about 60 to 90 seconds.

To push a change:
```
cd ~/afterduskevents-site
git add .
git commit -m "Describe what you changed"
git push
```

You can watch the deploy progress in the Vercel dashboard at https://vercel.com.

---

## Setting or Resetting the Resend API Key

Resend is the service that delivers the inquiry form emails to `hello@afterduskevents.com`.

**To add or change the key in Vercel:**
1. Go to your Vercel dashboard.
2. Select the `afterduskevents-site` project.
3. Click **Settings** then **Environment Variables**.
4. Set `RESEND_API_KEY` to your key from https://resend.com.
5. Click Save, then redeploy.

**If the key is missing locally:**
The site still works -- form submissions will be logged to the console instead of emailed. Set up the key before going live.

---

## Adding or Editing Packages

Open `app/packages/page.tsx`. Near the top you will find the `packages` array. Each package looks like:

```js
{
  name: "Basic Cinema",
  range: "$950 to $1,250",
  highlights: [
    "35-foot inflatable screen",
    "Projector",
    ...
  ],
},
```

To add a package, copy one of those blocks, paste it after the last one (before the `]`), and fill in the details. To change a price, just update the `range` string.

---

## Adding FAQ Questions

Open `app/faq/faq-accordion.tsx`. Find the `faqs` array. Each question looks like:

```js
{
  q: "How far do you travel?",
  a: "Anywhere inside 60 miles of Canton, MI...",
},
```

Add new entries the same way. Order in the file is the order on the page.

---

## Troubleshooting

**The site is not loading locally.**
Make sure the dev server is running (`npm run dev`) and you are visiting `http://localhost:3000`.

**I see TypeScript errors.**
Run `npm run build` in Terminal. It will tell you exactly which file and line has a problem. Usually this happens if you accidentally deleted a quote or bracket while editing.

**The form is not sending emails.**
Check that `RESEND_API_KEY` is set in Vercel environment variables. Also make sure the domain `afterduskevents.com` is verified in your Resend account under Domains.

**I need to change the contact email address.**
Open `app/actions/inquiry.ts` and find `to: "hello@afterduskevents.com"`. Replace it with the new address.

**The logo is not showing up.**
Make sure your file is named exactly `logo.png` (lowercase, no spaces) and is placed directly in the `public/` folder, not inside a subfolder.

---

## Contact

Questions about the code? Email blake@afterduskevents.com.
