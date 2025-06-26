# Elijah Farrell's Portfolio Website

A modern, interactive portfolio website built with Apple-inspired design principles. Features a dynamic theme system, smooth animations, and a fully responsive layout that showcases my projects, experience, and skills.

## ✨ Features

### 🎨 Design & UX
- **Apple-inspired Design**: Clean, minimal aesthetic with frosted glass effects
- **Dynamic Theme System**: Custom color picker with light/dark mode toggle
- **Responsive Design**: Optimized for all devices and screen sizes
- **Smooth Animations**: CSS animations and transitions throughout
- **Interactive Elements**: Hover effects, 3D transforms, and micro-interactions

### 🚀 Interactive Features
- **Typewriter Effect**: Dynamic text cycling through 15+ developer-focused phrases
- **Live Comment System**: Real-time comments powered by Firebase Firestore
- **Smooth Scrolling**: Seamless navigation between sections
- **Enhanced Navigation**: Sticky navbar with scroll effects
- **Mobile Menu**: Hamburger menu for mobile devices

### 📱 Modern Web Technologies
- **CSS Variables**: Dynamic theming system
- **CSS Grid & Flexbox**: Modern layout techniques
- **Intersection Observer**: Scroll-triggered animations
- **Custom Properties**: Theme-aware shadows and colors
- **Backdrop Filters**: Frosted glass effects

### 🎯 Content Sections
- **Hero Section**: Animated background with dynamic color particles
- **About**: Personal introduction with animated stats
- **Experience**: Interactive timeline with hover effects
- **Projects**: Featured projects with tech stack tags
- **Skills**: Animated skill bars and categorized expertise
- **Education**: Academic background with course highlights
- **Contact**: Contact information with live comment system

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with custom properties and animations
- **JavaScript (ES6+)**: Interactive functionality and dynamic content
- **Font Awesome**: Icon library for consistent iconography

### Backend & Services
- **Firebase Firestore**: Real-time database for comments
- **Firebase Hosting**: Live deployment and hosting

## 🎨 Theme System

The website features a sophisticated theme system:
- **Light/Dark Mode**: Toggle between themes with persistent storage
- **Custom Color Picker**: Choose any color for the primary theme
- **Dynamic Shadows**: Theme-aware shadow system
- **Adaptive Glows**: Button and element effects that match the theme
- **Color Variations**: Automatic generation of light/dark color variants

## 🚀 Performance Features

- **Optimized Animations**: Hardware-accelerated CSS transforms
- **Debounced Scroll Events**: Smooth performance during scrolling
- **Lazy Loading**: Efficient resource loading
- **Minimal Dependencies**: Lightweight and fast loading
- **Progressive Enhancement**: Works without JavaScript

## 📱 Responsive Design

- **Mobile-First**: Designed for mobile devices first
- **Breakpoint System**: Optimized for tablets, desktops, and large screens
- **Touch-Friendly**: Optimized for touch interactions
- **Accessible**: WCAG compliant with keyboard navigation support

## 🎯 Interactive Elements

### Enhanced Buttons
- Shimmer effects on hover
- 3D transform animations
- Theme-aware glow effects
- Scale and translate animations

### Timeline Experience
- Interactive timeline markers
- Hover animations with color transitions
- Smooth reveal animations
- Responsive layout adjustments

### Project Cards
- 3D hover effects
- Tech stack tags with animations
- Smooth transitions
- Responsive grid layout

### Skill Bars
- Animated progress bars
- Intersection observer triggers
- Smooth fill animations
- Category-based organization

## 🔧 Setup and Usage

### Local Development
```bash
# Clone the repository
git clone https://github.com/elijah-farrell/portfolio.git

# Navigate to the project directory
cd portfolio

# Open in your browser
open index.html
```

### Firebase Setup (for comments)
1. Create a Firebase project
2. Enable Firestore database
3. Update Firebase config in `index.html`
4. Set up security rules for the comments collection

## 📄 File Structure

```
portfolio-website/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with animations
├── script.js           # Interactive functionality
├── image/              # Images and assets
│   ├── favicon_neutral.png
│   ├── jcc-logo.png
│   └── suny-poly-logo.jpg
├── resume/             # Resume PDF
│   └── Elijah-Farrell.pdf
└── README.md           # This file
```

## 🎨 Customization

### Adding New Phrases
Edit the `phrases` array in `script.js` to customize the typewriter effect:
```javascript
const phrases = [
  "learn new things.",
  "code cool stuff.",
  // Add your own phrases here
];
```

### Theme Colors
The theme system automatically generates color variations. To modify:
1. Use the color picker in the navigation
2. Edit CSS custom properties in `styles.css`
3. Modify the `shadeColor` function in `script.js`

### Adding Sections
The modular CSS structure makes it easy to add new sections:
1. Add HTML structure in `index.html`
2. Create corresponding CSS classes in `styles.css`
3. Add animations and interactions in `script.js`

## 🌟 Recent Updates

### v2.0 - Complete Modernization
- **Redesigned UI**: Apple-inspired design with frosted glass effects
- **Dynamic Hero Background**: Color-adaptive particle system
- **Enhanced Animations**: Smooth transitions and micro-interactions
- **Improved Accessibility**: Better keyboard navigation and screen reader support
- **Mobile Optimization**: Enhanced mobile experience
- **Theme System**: Advanced color picker with light/dark mode
- **Interactive Elements**: 3D effects, hover animations, and smooth scrolling

### v1.5 - Feature Additions
- **Live Comments**: Real-time comment system with Firebase
- **Typewriter Effect**: Dynamic text cycling
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme toggle functionality

## 📞 Contact

- **Email**: elijah5003@gmail.com
- **Phone**: (315) 804‑0601
- **GitHub**: [elijah-farrell](https://github.com/elijah-farrell)
- **Location**: Watertown, NY

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ and modern web technologies*
