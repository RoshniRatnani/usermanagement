# User Management Application

A responsive Angular application for managing and viewing users, built with Angular 16 and featuring a clean, modern UI.

## Features

- 📋 **User List View**: Display users in a responsive card grid layout
- 🔍 **Search Functionality**: Filter users by name or username in real-time
- 🏷️ **Status Filtering**: Filter users by Active/In-Active status
- 👤 **User Details**: View detailed information for each user
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Loading States**: Visual feedback during API calls
- ❌ **Error Handling**: Graceful error handling with retry options
- 🧪 **Unit Tests**: Comprehensive tests for services and components

## Tech Stack

- **Angular 16**: Modern web framework
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming with Observables
- **CSS**: Custom styling with Flexbox and Grid
- **HttpClient**: API communication
- **Jasmine/Karma**: Unit testing

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v16 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-management-app
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Server

Start the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you make changes to the source files.

### Production Build

Build the application for production:
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Running Tests

### Unit Tests

Run unit tests with Karma:
```bash
ng test
```

### Run Tests Once (CI Mode)

```bash
ng test --watch=false --browsers=ChromeHeadless
```

### Code Coverage

Generate code coverage report:
```bash
ng test --code-coverage
```

## Project Structure

```
src/
├── app/
│   ├── users/
│   │   ├── models/
│   │   │   └── user.model.ts          # User interface definitions
│   │   ├── services/
│   │   │   ├── user.service.ts        # API service for user data
│   │   │   └── user.service.spec.ts   # Service unit tests
│   │   ├── user-list/
│   │   │   ├── user-list.component.ts
│   │   │   ├── user-list.component.html
│   │   │   ├── user-list.component.css
│   │   │   └── user-list.component.spec.ts
│   │   ├── user-detail/
│   │   │   ├── user-detail.component.ts
│   │   │   ├── user-detail.component.html
│   │   │   └── user-detail.component.css
│   │   ├── users-routing.module.ts
│   │   └── users.module.ts
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.ts
├── styles.css                          # Global styles
└── index.html
```

## API Integration

The application uses the JSONPlaceholder API for user data:

- **Endpoint**: `https://jsonplaceholder.typicode.com/users`
- **Method**: GET
- **Response**: Array of user objects

### User Object Structure

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona"
  },
  "address": {
    "city": "Gwenborough",
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "zipcode": "92998-3874"
  }
}
```

## Features Implementation

### 1. User List Page
- Displays all users in a responsive card grid
- Shows user avatar (first letter of name), name, username, email, phone, and company
- Status badge (Active/In-Active) randomly assigned

### 2. Search & Filter
- Real-time search by name or username
- Filter tabs for All/Active/In-Active users
- Combined filtering (search + status)

### 3. User Detail Page
- Accessible by clicking "View Profile" button
- Displays comprehensive user information
- Organized sections for Contact, Company, and Address
- Back navigation to user list

### 4. Responsive Design
- **Desktop (>1024px)**: Multi-column grid layout with sidebar
- **Tablet (768px-1024px)**: Adjusted grid with collapsed sidebar
- **Mobile (<768px)**: Single column layout, hidden sidebar

### 5. UI/UX Features
- Loading spinner during API calls
- Error messages with retry functionality
- Hover effects on cards and buttons
- Active state indicators for filters
- Smooth transitions and animations

## Design Decisions

1. **Module Structure**: Lazy-loaded users module for better performance
2. **Service Layer**: Centralized API calls in UserService
3. **Status Field**: Randomly generated (50/50 Active/In-Active) since API doesn't provide it
4. **Routing**: Separate routes for list and detail views
5. **Styling**: Pure CSS with CSS Grid and Flexbox (no UI libraries)
6. **State Management**: Component-level state (suitable for this app size)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Pagination or infinite scroll
- [ ] Sort functionality (by name, email, etc.)
- [ ] Edit user functionality
- [ ] Add new user functionality
- [ ] Local storage for favorites
- [ ] Dark mode toggle
- [ ] Export users to CSV

## Deployment

### GitHub Pages

1. Install angular-cli-ghpages:
```bash
npm install -g angular-cli-ghpages
```

2. Build and deploy:
```bash
ng build --configuration production --base-href /user-management-app/
npx angular-cli-ghpages --dir=dist/user-management-app
```

### Netlify

1. Build the application:
```bash
ng build --configuration production
```

2. Deploy the `dist/user-management-app` folder to Netlify

### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Created as part of an Angular Frontend Assignment

## Acknowledgments

- JSONPlaceholder API for providing test data
- Angular team for the excellent framework
- Design inspiration from modern UI/UX patterns
