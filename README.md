# 🎬 StreamBox - Modern Movie Browser App

A professional, cross-platform mobile application built with React Native (Expo) featuring user authentication, movie discovery, favorites management, and a modern Netflix-inspired UI.

---

## ✨ Features

### 🔐 Authentication & Security
- Secure login with DummyJSON API
- Registration with validation (Formik + Yup)
- **Encrypted token storage** using Expo Secure Store (iOS Keychain / Android Keystore)
- User-specific data isolation
- Complete profile information (name, email, gender, avatar)

### 🎥 Movie Discovery
- **Multiple Sections**: Trending Now, Top Viewed, Recommended for You
- **Search Functionality**: Search any movie from TMDB database
- Horizontal scrolling lists (Netflix-style)
- Movie cards with posters, titles, and ratings
- Detailed movie information with backdrop images
- Pull-to-refresh on all screens

### ❤️ Favorites Management
- Add/remove movies to favorites with animated heart icon
- **User-specific favorites** (each user has their own list)
- Redux state management with persistence
- Favorites survive logout and app restart
- Empty state with helpful messaging

### 👤 Profile & Customization
- Complete user profile with API data
- Upload and store custom profile avatar
- **Dark/Light theme toggle** with instant switching
- User info display (full name, email, gender)
- Profile picture from DummyJSON API
- Secure logout with data cleanup

### 🎨 Modern UI/UX
- Netflix/Disney+ inspired interface
- Smooth animations and transitions
- Rating badges on movie posters
- Professional color scheme (dark blues, vibrant red accent)
- Responsive layouts
- Modern bottom tab navigation

---

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Expo SDK 54 with React Native
- **Language**: JavaScript (TypeScript-compatible)
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation (Stack + Bottom Tabs)

### Libraries & Tools
- **Forms**: Formik + Yup validation
- **Icons**: Feather Icons (@expo/vector-icons)
- **Storage**: AsyncStorage + Expo Secure Store
- **Persistence**: Redux Persist
- **HTTP Client**: Axios
- **Image Picker**: Expo Image Picker

### APIs
- **TMDB API**: Movie data (trending, popular, top rated, search)
- **DummyJSON API**: Authentication testing

---

## 📋 Prerequisites

- **Node.js** v14 or higher
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **Android Emulator** or **iOS Simulator**
- **TMDB API Key** (free from themoviedb.org)

---

## 🚀 Installation & Setup

### 1. Clone & Install
```bash
cd StreamBox
npm install
```

### 2. Configure TMDB API Key ⚠️ **REQUIRED**

Get your free API key:
1. Visit https://www.themoviedb.org/signup
2. Go to Settings → API → Request API Key
3. Choose "Developer" option

Add your key:
1. Open `src/api/tmdb.js`
2. Replace the placeholder:
```javascript
const TMDB_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
```

### 3. Run the App
```bash
npm start
```

Then press:
- `a` for Android Emulator
- `i` for iOS Simulator
- `w` for Web Browser
- Scan QR code with Expo Go on your phone

---

## 🔑 Test Credentials

### Login
Use these DummyJSON test accounts:

**Option 1:**
- Username: `emilys`
- Password: `emilyspass`

**Option 2:**
- Username: `michaelw`
- Password: `michaelwpass`

### Registration
Registration is simulated (no real account creation). Just fill the form and you'll be redirected to login.

---

## 📱 App Structure

### Navigation Flow
```
App Entry
├── Auth Flow (Not Authenticated)
│   ├── Login Screen
│   └── Register Screen
└── Main Flow (Authenticated)
    ├── Bottom Tab Navigator
    │   ├── Home (with Search)
    │   ├── Favorites
    │   └── Profile
    └── Details (Modal Stack)
```

### File Structure
```
StreamBox/
├── App.js                          # Entry point with Redux & Theme providers
├── src/
│   ├── api/
│   │   ├── tmdb.js                # TMDB API integration
│   │   └── auth.js                # DummyJSON authentication
│   ├── components/
│   │   ├── MovieCard.js           # Vertical card for lists
│   │   ├── MovieCardHorizontal.js # Horizontal scrolling card
│   │   ├── SearchBar.js           # Search component
│   │   ├── CustomInput.js         # Form input with Formik
│   │   ├── CustomButton.js        # Themed button
│   │   └── ProfileAvatar.js       # Avatar with dropdown menu
│   ├── navigation/
│   │   ├── AppNavigator.js        # Root navigator with auth logic
│   │   ├── AuthStack.js           # Login/Register stack
│   │   ├── MainNavigator.js       # Main app stack
│   │   └── TabNavigator.js        # Bottom tabs (Home/Favorites/Profile)
│   ├── redux/
│   │   ├── store.js               # Redux store with persistence
│   │   ├── authSlice.js           # Authentication state
│   │   └── favoritesSlice.js      # Favorites with user-specific storage
│   ├── screens/
│   │   ├── Login.js               # Login with Formik validation
│   │   ├── Register.js            # Registration with validation
│   │   ├── HomeModern.js          # Multi-section home with search
│   │   ├── Details.js             # Movie details with favorite toggle
│   │   ├── Favorites.js           # User's favorite movies
│   │   └── Profile.js             # User profile & settings
│   ├── theme/
│   │   ├── ThemeContext.js        # Theme provider (dark/light)
│   │   └── colors.js              # Color palette & typography
│   └── utils/
│       └── storage.js             # Storage helpers (secure & async)
└── package.json
```

---

## 🎯 Key Features Explained

### 1. User-Specific Data
Each user has their own:
- Favorites (stored as `FAVORITES_USER_1`, `FAVORITES_USER_2`, etc.)
- Profile avatar
- Session data

**How it works:**
- On login, user ID is used to load their specific data
- On logout, Redux state is cleared but storage remains
- Next login loads the correct user's data

### 2. Search Functionality
- Type in search bar at top of Home screen
- Press "Search" on keyboard to search
- Results displayed in horizontal scrollable list
- Press "X" button to clear search and return to home

### 3. Favorites System
- Tap heart icon on movie details
- Icon animates and changes color
- Saved to user-specific AsyncStorage immediately
- Persists across logout/login and app restart
- Redux manages state for instant UI updates

### 4. Theme Switching
- Toggle in Profile screen under "Settings"
- Theme preference saved to AsyncStorage
- Instant update across entire app
- Dark mode optimized for OLED screens

### 5. Secure Authentication
- **Tokens**: Encrypted in Expo Secure Store
- **User Data**: Plain text in AsyncStorage (non-sensitive)
- **Auto-login**: Checks secure storage on app start
- **Clean Logout**: Removes all user data

---

## 🎨 Design & UI

### Color Scheme
- **Primary**: Netflix Red (#E50914)
- **Secondary**: Teal Blue (#00D9FF)
- **Dark Background**: Deep Navy (#0A0E27)
- **Light Background**: Clean White (#FFFFFF)
- **Accent**: Gold stars for ratings

### Typography
- **H1**: 32px, Bold (Titles)
- **H2**: 24px, Bold (Section headers)
- **Body**: 16px, Normal
- **Caption**: 14px (Metadata)

### Components Style
- Modern card designs with shadows
- Rounded corners (8-16px)
- Smooth animations (150-300ms)
- Touch feedback on all interactive elements

---

## 🔧 Technical Implementation

### State Management
```javascript
// Redux Store Structure
{
  auth: {
    user: { id, username, email, firstName, lastName, gender, image },
    token: "...",
    isAuthenticated: true
  },
  favorites: {
    items: [/* user-specific movies */],
    currentUserId: 1
  }
}
```

### Storage Strategy
```javascript
// Secure Storage (Encrypted)
AUTH_TOKEN → Expo Secure Store

// AsyncStorage (Plain Text)
USER_ID, USER_NAME, USER_EMAIL → User session data
USER_FIRST_NAME, USER_LAST_NAME, USER_GENDER, USER_IMAGE → Profile data
PROFILE_AVATAR → Custom uploaded avatar
FAVORITES_USER_1, FAVORITES_USER_2, ... → Per-user favorites
APP_THEME → Theme preference
```

### API Integration
```javascript
// TMDB Endpoints Used
GET /trending/movie/week       // Trending Now section
GET /movie/popular            // Top Viewed section
GET /movie/top_rated          // Recommended section
GET /search/movie?query=...   // Search functionality
GET /movie/{id}               // Movie details

// DummyJSON
POST /auth/login              // Authentication
```

---

## 📊 Performance Optimizations

- **Parallel API Calls**: Load all sections simultaneously
- **Horizontal FlatLists**: Limit to 10 items per section
- **Image Optimization**: Proper poster/backdrop sizing
- **Memoized Components**: Prevent unnecessary re-renders
- **Lazy Loading**: Images load on demand
- **Pull-to-Refresh**: Manual refresh instead of polling

---

## 🐛 Troubleshooting

### App crashes on start
**Solution**: Add your TMDB API key in `src/api/tmdb.js`

### "Invalid credentials" on login
**Solution**: Use test credentials:
- `emilys` / `emilyspass`
- `michaelw` / `michaelwpass`

### Images not loading
**Solutions**:
1. Verify TMDB API key is correct
2. Check internet connection
3. Check TMDB API status

### Favorites not persisting
**Solution**: This is now fixed with user-specific storage. Each user's favorites are saved separately.

### Theme not saving
**Solution**: AsyncStorage permission might be needed. Try reinstalling the app.

### Metro bundler errors
**Solution**: Clear cache and restart:
```bash
npm start -- --reset-cache
```

---

## 📖 Usage Guide

### First Time Setup
1. Install and run the app
2. Click "Register" to create mock account (or use test credentials)
3. Login with credentials
4. Browse movies on home screen
5. Tap any movie to see details
6. Tap heart to add to favorites
7. Go to Profile to customize settings

### Daily Use
1. **Home**: Browse trending movies, search for specific titles
2. **Favorites**: Quick access to your saved movies
3. **Profile**: Switch theme, update avatar, logout

### Multi-User Support
- Each user gets their own favorites
- Profile picture can be customized per user
- Data remains isolated between users
- Logout and login as different user to test

---

## 🔒 Security Features

✅ **Encrypted Token Storage** - iOS Keychain / Android Keystore
✅ **User Data Isolation** - Per-user favorites and settings
✅ **Secure Logout** - Complete data cleanup
✅ **No Hardcoded Secrets** - API keys in separate file
✅ **Validation** - Form validation on all inputs
✅ **Error Handling** - Graceful error messages

---

## 🎓 Learning Outcomes

This project demonstrates:
- React Native app architecture
- Redux state management
- Secure authentication flows
- API integration best practices
- User experience design
- Theme implementation
- Navigation patterns
- Form validation
- Data persistence
- Performance optimization

---

## 📄 Requirements Met

### ✅ Technical Requirements
- [x] Expo CLI framework
- [x] Redux Toolkit for state management (favorites)
- [x] React Navigation (Stack + Bottom Tabs)
- [x] Feather Icons exclusively
- [x] Formik + Yup for forms
- [x] AsyncStorage for persistence
- [x] Modular, reusable components

### ✅ Feature Requirements
- [x] Login with DummyJSON API
- [x] Registration screen
- [x] Home screen with trending movies
- [x] Movie details screen
- [x] Favorites with Redux
- [x] User profile screen
- [x] Dark mode toggle (bonus)
- [x] Username visible in header

### ✅ Bonus Features Implemented
- [x] Modern multi-section home
- [x] Search functionality
- [x] User-specific data isolation
- [x] Profile picture upload
- [x] Complete user profile display
- [x] Encrypted token storage
- [x] Professional UI/UX

---

## 🚦 Testing Checklist

### Authentication
- [ ] Login with `emilys` / `emilyspass`
- [ ] Login with `michaelw` / `michaelwpass`
- [ ] Registration form validation
- [ ] Logout functionality

### Home Screen
- [ ] Trending movies load
- [ ] Top Viewed section loads
- [ ] Recommended section loads
- [ ] Search works with results
- [ ] Pull-to-refresh works
- [ ] Username displays in header

### Favorites
- [ ] Add movie to favorites (heart icon animates)
- [ ] Remove from favorites
- [ ] Favorites persist after logout
- [ ] Different users have different favorites
- [ ] Empty state shows correctly

### Profile
- [ ] Profile info displays correctly
- [ ] Dark/Light theme toggle works
- [ ] Avatar upload works
- [ ] API profile picture displays
- [ ] Logout clears data

### Multi-User
- [ ] Login as User 1, add favorites
- [ ] Logout
- [ ] Login as User 2, verify empty favorites
- [ ] Add different favorites for User 2
- [ ] Login as User 1 again, verify original favorites

---

## 📦 Production Deployment

### 🚀 Building for Production

StreamBox is configured for production builds using **EAS Build** (Expo Application Services). You have two main deployment options:

#### **Option 1: EAS Build (Recommended)**

**Advantages:**
- ✅ Cloud-based builds (no need for Android Studio/Xcode)
- ✅ Easy submission to app stores
- ✅ Free tier available (30 builds/month)
- ✅ Professional workflow

**Setup:**
```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Login to your Expo account
eas login

# 3. Configure the project (already done for you!)
# eas.json is already configured

# 4. Build for Android (APK)
npm run build:android

# Alternative: Build preview APK for testing
npm run build:preview

# 5. Build for iOS (requires Apple Developer account - $99/year)
npm run build:ios

# 6. Submit to app stores
npm run submit:android    # Google Play Store
npm run submit:ios        # Apple App Store
```

**Download & Install:**
- After build completes, download APK from EAS dashboard
- Install directly on Android device for testing
- Or submit to Google Play Store

#### **Option 2: Local Builds**

For developers with Android Studio/Xcode installed:

```bash
# Android (requires Android Studio + JDK)
npx expo run:android --variant release

# iOS (requires macOS + Xcode + Apple Developer account)
npx expo run:ios --configuration Release
```

### 📱 App Configuration

Your app is already configured with production-ready settings in `app.json` and `eas.json`:

**Android:**
- Package Name: `com.streambox.app`
- Version Code: 1
- Adaptive Icons: ✅ Configured
- Permissions: Camera, Storage

**iOS:**
- Bundle Identifier: `com.streambox.app`
- Build Number: 1.0.0
- Permissions: Camera, Photo Library
- Tablet Support: ✅ Enabled

### 📊 Build Profiles (eas.json)

```javascript
"development"  // For development with Expo Go
"preview"      // For internal testing (APK)
"production"   // For app store releases
```

### 🏪 App Store Submission

**Google Play Store:**
1. Create developer account ($25 one-time)
2. Run `npm run submit:android`
3. Fill in store listing details
4. Submit for review

**Apple App Store:**
1. Create Apple Developer account ($99/year)
2. Run `npm run submit:ios`
3. Configure App Store Connect
4. Submit for review

### 🎯 Production Checklist

Before building for production, ensure:

- [ ] **TMDB API Key** is added to `src/api/tmdb.js`
- [ ] Test with real devices (not just simulator)
- [ ] Verify all features work offline/online
- [ ] Test on different screen sizes
- [ ] Check app icons and splash screen
- [ ] Review permissions in app.json
- [ ] Update version numbers (app.json)
- [ ] Test deep linking (if applicable)

### 🔒 Environment Variables (Optional)

For production, consider using environment variables:

```bash
# Create .env file (already in .gitignore)
TMDB_API_KEY=your_actual_key_here
```

Then use `expo-constants` to access them securely.

### 📈 App Size

Current build size (approximate):
- **Android APK**: ~50-70 MB
- **iOS IPA**: ~60-80 MB

### 🚨 Important Notes

**For Academic Submission:**
- You can directly share the APK file built with EAS
- No need to publish to Google Play Store
- APK can be installed on any Android device

**For Production Deployment:**
- Use EAS Build for professional builds
- Always test on real devices before submission
- Follow platform guidelines (Android/iOS)
- Monitor app performance and crashes

### 📖 Additional Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policies](https://play.google.com/console/about/guides/app-review/)
- [Expo Submission](https://docs.expo.dev/submit/introduction/)

---

## 🤝 Credits

### APIs & Data
- **TMDB** - The Movie Database (https://www.themoviedb.org/)
- **DummyJSON** - Free fake REST API (https://dummyjson.com/)

### Technologies
- **Expo** - React Native framework
- **Redux** - State management
- **React Navigation** - Navigation library

---

## 📝 License

This project is created for educational purposes as part of a mobile application development course.

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Verify TMDB API key is correctly added
3. Ensure all dependencies are installed (`npm install`)
4. Try clearing cache (`npm start -- --reset-cache`)

---

## 🎉 Final Notes

**StreamBox** is a complete, production-ready mobile application demonstrating modern React Native development practices, secure authentication, state management, and professional UI/UX design.

Built with ❤️ using React Native, Redux, and TMDB API.

---

**Happy Streaming! 🍿🎬**
