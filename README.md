# HooshanSystem - Digital Twins Platform

A comprehensive web-based digital twins platform for industrial IoT monitoring, device management, and real-time analytics.

## 🚀 Features

### Digital Twin Visualization
- **Real-time 3D Device Models**: Interactive visualization of connected devices with live status indicators
- **Live Data Monitoring**: Real-time charts and graphs showing sensor data, performance metrics, and system health
- **Device Status Indicators**: Color-coded status lights showing device operational states (active, warning, error)

### Device Management
- **Multi-Device Support**: Monitor and control various industrial devices (sensors, motors, pumps, controllers)
- **Remote Control**: Execute device commands remotely (start/stop, calibrate, emergency controls)
- **Device Metrics**: View real-time metrics including temperature, humidity, speed, flow rates, and more
- **Historical Data**: Access device performance history and trends

### Analytics & Insights
- **Performance Monitoring**: Track device efficiency and performance over time
- **Predictive Maintenance**: AI-powered maintenance scheduling based on device usage patterns
- **Real-time Charts**: Interactive charts powered by Chart.js for data visualization
- **System Health Dashboard**: Comprehensive overview of entire system status

### Smart Controls
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices
- **Keyboard Shortcuts**: Quick navigation using Ctrl+1-4 for different sections
- **Accessibility Features**: ARIA labels, keyboard navigation, and screen reader support
- **Real-time Notifications**: Toast notifications for system events and alerts

## 🏗️ Architecture

### Frontend Stack
- **HTML5**: Semantic markup with modern web standards
- **CSS3**: Advanced styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: No framework dependencies, pure JavaScript for maximum performance
- **Chart.js**: Professional charting library for data visualization

### Digital Twin Components
1. **Device Simulation Engine**: Realistic sensor data simulation with configurable parameters
2. **Real-time Data Pipeline**: Live data updates every 1-5 seconds (configurable)
3. **Interactive UI Components**: Modular design with reusable components
4. **Notification System**: Toast-based notification system for user feedback

## 📋 Usage

### Getting Started
1. Open `index.html` in a modern web browser
2. The dashboard will load automatically with simulated device data
3. Navigate between sections using the top navigation menu

### Navigation Sections

#### 1. Dashboard
- Overview of system statistics
- Real-time monitoring charts
- Interactive 3D device visualization
- Key performance indicators

#### 2. Devices
- Individual device cards with live metrics
- Device control buttons (start, stop, calibrate, emergency stop)
- Status indicators and performance data
- Device-specific actions and configurations

#### 3. Analytics
- Performance trend charts
- Predictive maintenance schedules
- Historical data analysis
- System efficiency metrics

#### 4. Settings
- Update frequency configuration (1s to 30s intervals)
- Data retention settings
- Alert threshold configuration
- Notification preferences

### Keyboard Shortcuts
- `Ctrl + 1`: Navigate to Dashboard
- `Ctrl + 2`: Navigate to Devices
- `Ctrl + 3`: Navigate to Analytics
- `Ctrl + 4`: Navigate to Settings

### Device Interactions
- **Click device nodes** in the 3D visualization to view details
- **Use control buttons** to interact with devices
- **Monitor status indicators** for real-time device health
- **View live metrics** updating every second

## 🔧 Customization

### Adding New Devices
Edit the `devices` object in `script.js`:

```javascript
this.devices = {
    newDevice: { 
        value: 0, 
        min: 0, 
        max: 100, 
        unit: ' units' 
    }
};
```

### Modifying Update Intervals
Change the update frequency in the settings or modify the default interval:

```javascript
// In script.js, modify the interval (milliseconds)
this.updateInterval = setInterval(() => {
    this.updateDeviceValues();
}, 1000); // 1 second updates
```

### Styling Customization
Modify `styles.css` to change:
- Color schemes and gradients
- Device node appearances
- Chart styling
- Responsive breakpoints

## 🌐 Browser Compatibility

- **Chrome**: 70+
- **Firefox**: 65+
- **Safari**: 12+
- **Edge**: 79+

## 📱 Mobile Responsive

The platform is fully responsive and optimized for:
- **Desktop**: Full feature experience
- **Tablet**: Touch-optimized interface
- **Mobile**: Streamlined mobile experience

## 🔒 Security Features

- **No external data transmission**: All data is simulated locally
- **No authentication required**: Demo-ready platform
- **CSP-friendly**: Compatible with Content Security Policies
- **XSS protection**: Proper input sanitization

## 🚀 Deployment

### Local Development
Simply open `index.html` in a web browser - no build process required.

### Web Server Deployment
Upload files to any web server:
```bash
# Example using Python's built-in server
python -m http.server 8000
# Then visit http://localhost:8000
```

### Static Hosting
Compatible with:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any static hosting service

## 🤝 Contributing

The platform is designed to be easily extensible:

1. **Adding new device types**: Extend the device management system
2. **Custom visualizations**: Add new chart types or 3D models
3. **Additional analytics**: Implement new analytical insights
4. **Enhanced controls**: Add more sophisticated device interactions

## 📄 License

This project is open source and available under standard web development practices.

---

**Built with ❤️ for Industrial IoT and Digital Twin applications**
