# Quick Setup Guide

## Prerequisites Check

Verify you have the required tools installed:

```bash
node --version    # Should be v14 or higher
npm --version     # Should be v6 or higher
ng version        # Should be v16 or higher
```

If Angular CLI is not installed:
```bash
npm install -g @angular/cli@16
```

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
ng serve
```

The application will be available at: `http://localhost:4200/`

### 3. Run Tests (Optional)
```bash
ng test --watch=false --browsers=ChromeHeadless
```

## Troubleshooting

### Port Already in Use
If port 4200 is already in use:
```bash
ng serve --port 4300
```

### Node Version Warning
If you see a Node version warning, it's safe to ignore for this project.

### Module Not Found Errors
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Quick Test

Once the server is running:

1. Navigate to `http://localhost:4200/`
2. You should see the User Management page with a list of users
3. Try the search box to filter users
4. Click on status tabs (All/Active/In-Active)
5. Click "View Profile" on any user card to see details

## Building for Production

```bash
ng build --configuration production
```

Output will be in `dist/user-management-app/`

## Next Steps

- Review the main README.md for detailed documentation
- Check the project structure in `src/app/users/`
- Explore the responsive design by resizing your browser
- Run tests to see code coverage

## Support

If you encounter any issues:
1. Check that all dependencies are installed
2. Verify Node and Angular CLI versions
3. Clear browser cache
4. Check console for error messages
