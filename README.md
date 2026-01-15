# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
---

## Contact form (EmailJS)

The contact form in `src/components/Contact.jsx` uses EmailJS to send messages directly from the browser. To enable it:

1. Create an account at https://www.emailjs.com and add an email service (e.g. Gmail, SMTP).
2. Create an EmailJS template that expects variables: `from_name`, `from_email`, `company`, and `message`.
3. In EmailJS get your **Service ID**, **Template ID**, and **Public Key**.
4. Add these to your environment (in the project root create a `.env` file or set them in your hosting environment):

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

5. Install the client dependency and restart dev server:

```
pnpm add @emailjs/browser
pnpm run dev
```

Notes:
- If you prefer not to use EmailJS you can replace the form submission with a server endpoint (e.g., a serverless function) that uses Nodemailer or any transactional email provider.
- The contact form includes basic validation and a honeypot field to reduce spam.
