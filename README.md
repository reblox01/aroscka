# Aroscka - Custom IPhone Case Design & E-commerce Platform

A modern, interactive platform for designing and ordering custom iPhone cases, built with Next.js 14 App Router and TypeScript.

[Live Preview](https://github.com/reblox01/aroscka/blob/b8a14aed618b4801f9f8bd074f131fc7542ac6d2/public/preview.png)

## Key Features

- 🎨 Interactive Case Designer
  - Real-time case color previews
  - Drag-and-drop image positioning
  - Custom image cropping and scaling
  - Multiple iPhone model support

- 💫 Premium Customization Options
  - Multiple case materials (Silicone/Polycarbonate)
  - Various finishes (Smooth/Textured)
  - Premium color selection (Black/Blue/Rose)
  - High-quality print warranty

- 🛍️ Seamless Shopping Experience
  - Stripe payment integration
  - PayPal payment support
  - Real-time price calculations
  - Secure checkout process

- 🔐 User Management
  - Kinde authentication integration
  - Admin dashboard for order management
  - Order status tracking
  - Shipping address management

## Technical Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Headless UI
- **State Management**: TanStack Query
- **Database**: PostgreSQL with Prisma ORM
- **File Uploads**: UploadThing
- **Payments**: Stripe
- **Email**: Resend
- **Authentication**: Kinde Auth
- **Styling**: Tailwind CSS with custom configurations

## Infrastructure

- 🔄 Server-side mutations with Next.js server actions
- 📦 Prisma for type-safe database operations
- 🖼️ Optimized image handling with Next.js Image
- 🎯 Responsive design for all device sizes
- ⚡ Real-time preview updates
- 🔒 Secure payment processing

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/aroscka.git
    cd aroscka
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3. **Set up environment variables:**
    Open your terminal and run this command:
    ```bash
    copy .env.example .env
    ```
    Or Create a `.env` file in the root directory with the following variables:
    ```bash
    # Retrieved from our hosted database at neon.tech
    # Database (Required)
    DATABASE_URL="your_postgresql_url"

    # Retrieved from our auth provider Kinde
    # Authentication (Required)
    KINDE_CLIENT_ID="your_kinde_client_id"
    KINDE_CLIENT_SECRET="your_kinde_client_secret"
    KINDE_ISSUER_URL="https://your-kinde-app.kinde.com"
    KINDE_SITE_URL="http://localhost:3000"
    KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
    KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/"

    # Retrieved from file uploading service uploadthing
    # File Upload (Required)
    UPLOADTHING_SECRET="your_uploadthing_secret"
    UPLOADTHING_APP_ID="your_uploadthing_app_id"

    # Retrieved from our payment provider stripe
    # Payment Processing (Required)
    STRIPE_SECRET_KEY="your_stripe_secret_key"
    STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

    # Retrieved from email sending service resend
    # Email (Optional)
    RESEND_API_KEY="your_resend_api_key"

    # Your email to access the secret admin dashboard
    # Admin Access (Optional)
    ADMIN_EMAIL="your_admin_email"

    # Application URL
    NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

    # You can generate one from https://jwtsecret.com/generate
    # JWT Token (Required) 
    JWT_SECRET="your_jwt_token"
    ```

4. **Set up the database:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5. **Run the development server:**
    ```bash
    npm run dev
    # or
    pnpm dev
    ```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Development

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account for payments
- Kinde account for authentication
- UploadThing account for file uploads
- (Optional) Resend account for emails

### Key URLs
- Main application: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/dashboard`
- Case designer: `http://localhost:3000/configure/upload`
- Preview page: `http://localhost:3000/configure/preview`

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create your feature branch:**
    ```bash
    git checkout -b feature/amazing-feature
    ```
3. **Make your changes and commit:**
    ```bash
    git commit -m 'Add some amazing feature'
    ```
4. **Push to your branch:**
    ```bash
    git push origin feature/amazing-feature
    ```
5. **Open a pull request**

### Development Guidelines
- Follow the existing code style
- Add appropriate TypeScript types
- Test your changes thoroughly
- Update documentation as needed

## Support

If you find this project helpful, consider:

- Starring the repository
- Reporting issues
- Contributing to the code
- Sharing the project

### Support My Work

If you find this project valuable and would like to support its continued development:

- 💖 **One-time Donations**
  - [Buy me a coffee](https://www.buymeacoffee.com/arosck1) ☕ - For a quick thank you
  - [PayPal](https://paypal.me/soukoutari) 💳 - Flexible one-time contributions
  
- 🌟 **Recurring Support** 
  - [GitHub Sponsors](https://github.com/sponsors/reblox01) 💝 - Support ongoing development

Your support helps maintain this project and enables new features. Thank you! 🙏

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Stripe](https://stripe.com/) - Payment processing
- [Kinde](https://kinde.com/) - Authentication
- [UploadThing](https://uploadthing.com/) - File uploads

