// Digital Twins JavaScript Controller
class DigitalTwinsSystem {
    constructor() {
        this.devices = {
            temp1: { value: 23.5, min: 15, max: 35, unit: '°C' },
            humidity1: { value: 65, min: 30, max: 90, unit: '%' },
            motorSpeed: { value: 1450, min: 0, max: 3000, unit: ' RPM' },
            flowRate: { value: 12.3, min: 0, max: 25, unit: ' L/min' }
        };
        
        this.charts = {};
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupCharts();
        this.setupDeviceControls();
        this.startRealTimeUpdates();
        this.setupSettingsControls();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links and sections
                navLinks.forEach(nl => nl.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Show corresponding section
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    }

    setupCharts() {
        // Real-time chart
        const realtimeCtx = document.getElementById('realtimeChart');
        if (realtimeCtx) {
            this.charts.realtime = new Chart(realtimeCtx, {
                type: 'line',
                data: {
                    labels: Array.from({length: 20}, (_, i) => `-${19-i}s`),
                    datasets: [
                        {
                            label: 'Temperature (°C)',
                            data: Array.from({length: 20}, () => Math.random() * 10 + 20),
                            borderColor: '#667eea',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Humidity (%)',
                            data: Array.from({length: 20}, () => Math.random() * 20 + 50),
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        }
                    },
                    animation: {
                        duration: 750
                    }
                }
            });
        }

        // Performance chart
        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx) {
            this.charts.performance = new Chart(performanceCtx, {
                type: 'bar',
                data: {
                    labels: ['Motor A', 'Motor B', 'Pump 1', 'Pump 2', 'Sensor Array'],
                    datasets: [{
                        label: 'Efficiency (%)',
                        data: [85, 92, 78, 88, 95],
                        backgroundColor: [
                            'rgba(102, 126, 234, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)',
                            'rgba(139, 92, 246, 0.8)'
                        ],
                        borderColor: [
                            '#667eea',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        }
                    }
                }
            });
        }
    }

    setupDeviceControls() {
        // Temperature sensor calibration
        document.querySelectorAll('.device-controls .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.textContent.toLowerCase();
                this.handleDeviceAction(action, e.target);
            });
        });

        // Device node interactions
        document.querySelectorAll('.device-node').forEach(node => {
            node.addEventListener('click', (e) => {
                this.showDeviceDetails(node.dataset.device);
            });
        });
    }

    handleDeviceAction(action, button) {
        const card = button.closest('.device-card');
        const deviceName = card.querySelector('h3').textContent;
        
        // Add visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        switch(action) {
            case 'calibrate':
                this.showNotification(`Calibrating ${deviceName}...`, 'info');
                setTimeout(() => {
                    this.showNotification(`${deviceName} calibrated successfully!`, 'success');
                }, 2000);
                break;
            
            case 'view history':
                this.showNotification(`Opening history for ${deviceName}`, 'info');
                break;
            
            case 'reduce speed':
                this.devices.motorSpeed.value = Math.max(500, this.devices.motorSpeed.value - 200);
                this.updateDeviceDisplay('motorSpeed');
                this.showNotification('Motor speed reduced', 'warning');
                break;
            
            case 'emergency stop':
                this.devices.motorSpeed.value = 0;
                this.updateDeviceDisplay('motorSpeed');
                this.showNotification('EMERGENCY STOP ACTIVATED', 'error');
                break;
            
            case 'start':
                this.devices.flowRate.value = 12.3;
                this.updateDeviceDisplay('flowRate');
                this.showNotification('Pump started', 'success');
                break;
            
            case 'stop':
                this.devices.flowRate.value = 0;
                this.updateDeviceDisplay('flowRate');
                this.showNotification('Pump stopped', 'info');
                break;
        }
    }

    showDeviceDetails(deviceId) {
        const device = this.devices[deviceId];
        if (device) {
            this.showNotification(`${deviceId}: ${device.value}${device.unit}`, 'info');
        }
    }

    startRealTimeUpdates() {
        this.updateInterval = setInterval(() => {
            this.updateDeviceValues();
            this.updateCharts();
            this.updateStats();
        }, 1000);
    }

    updateDeviceValues() {
        // Simulate realistic sensor variations
        this.devices.temp1.value += (Math.random() - 0.5) * 0.5;
        this.devices.temp1.value = Math.max(this.devices.temp1.min, 
            Math.min(this.devices.temp1.max, this.devices.temp1.value));

        this.devices.humidity1.value += (Math.random() - 0.5) * 2;
        this.devices.humidity1.value = Math.max(this.devices.humidity1.min, 
            Math.min(this.devices.humidity1.max, this.devices.humidity1.value));

        // Only update motor speed if it's running
        if (this.devices.motorSpeed.value > 0) {
            this.devices.motorSpeed.value += (Math.random() - 0.5) * 50;
            this.devices.motorSpeed.value = Math.max(500, 
                Math.min(this.devices.motorSpeed.max, this.devices.motorSpeed.value));
        }

        // Only update flow rate if pump is running
        if (this.devices.flowRate.value > 0) {
            this.devices.flowRate.value += (Math.random() - 0.5) * 0.5;
            this.devices.flowRate.value = Math.max(0, 
                Math.min(this.devices.flowRate.max, this.devices.flowRate.value));
        }

        // Update display
        Object.keys(this.devices).forEach(deviceId => {
            this.updateDeviceDisplay(deviceId);
        });
    }

    updateDeviceDisplay(deviceId) {
        const element = document.getElementById(deviceId);
        if (element) {
            const device = this.devices[deviceId];
            const value = typeof device.value === 'number' ? 
                device.value.toFixed(1) : device.value;
            element.textContent = `${value}${device.unit}`;
        }
    }

    updateCharts() {
        if (this.charts.realtime) {
            const chart = this.charts.realtime;
            
            // Update temperature data
            chart.data.datasets[0].data.shift();
            chart.data.datasets[0].data.push(this.devices.temp1.value);
            
            // Update humidity data
            chart.data.datasets[1].data.shift();
            chart.data.datasets[1].data.push(this.devices.humidity1.value);
            
            chart.update('none');
        }
    }

    updateStats() {
        // Update connected devices count
        const deviceCount = document.getElementById('deviceCount');
        if (deviceCount) {
            const activeDevices = Object.values(this.devices).filter(d => d.value > 0).length;
            deviceCount.textContent = activeDevices + 8; // Base count plus active devices
        }

        // Update data points
        const dataPoints = document.getElementById('dataPoints');
        if (dataPoints) {
            const points = (Math.random() * 0.5 + 1.0).toFixed(1);
            dataPoints.textContent = points + 'K';
        }
    }

    setupSettingsControls() {
        // Update frequency selector
        const frequencySelect = document.querySelector('.setting-input');
        if (frequencySelect) {
            frequencySelect.addEventListener('change', (e) => {
                const value = e.target.value;
                let interval = 1000;
                
                if (value.includes('5 sec')) interval = 5000;
                else if (value.includes('10 sec')) interval = 10000;
                else if (value.includes('30 sec')) interval = 30000;
                
                clearInterval(this.updateInterval);
                this.updateInterval = setInterval(() => {
                    this.updateDeviceValues();
                    this.updateCharts();
                    this.updateStats();
                }, interval);
                
                this.showNotification(`Update frequency changed to ${value}`, 'info');
            });
        }

        // Alert threshold slider
        const slider = document.querySelector('.setting-slider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const span = e.target.nextElementSibling;
                if (span) {
                    span.textContent = e.target.value + '%';
                }
            });
        }

        // Email notifications checkbox
        const emailCheckbox = document.querySelector('.setting-checkbox');
        if (emailCheckbox) {
            emailCheckbox.addEventListener('change', (e) => {
                const status = e.target.checked ? 'enabled' : 'disabled';
                this.showNotification(`Email notifications ${status}`, 'info');
            });
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            maxWidth: '300px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            transform: 'translateX(400px)',
            transition: 'all 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            info: '#667eea',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Public methods for external control
    stopUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    startUpdates() {
        if (!this.updateInterval) {
            this.startRealTimeUpdates();
        }
    }

    getDeviceData() {
        return this.devices;
    }

    setDeviceValue(deviceId, value) {
        if (this.devices[deviceId]) {
            this.devices[deviceId].value = value;
            this.updateDeviceDisplay(deviceId);
        }
    }
}

// Initialize the Digital Twins System when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.digitalTwins = new DigitalTwinsSystem();
    
    // Add some additional interactive features
    addKeyboardShortcuts();
    addTooltips();
    enhanceAccessibility();
});

function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    document.querySelector('a[href="#dashboard"]').click();
                    break;
                case '2':
                    e.preventDefault();
                    document.querySelector('a[href="#devices"]').click();
                    break;
                case '3':
                    e.preventDefault();
                    document.querySelector('a[href="#analytics"]').click();
                    break;
                case '4':
                    e.preventDefault();
                    document.querySelector('a[href="#settings"]').click();
                    break;
            }
        }
    });
}

function addTooltips() {
    const deviceNodes = document.querySelectorAll('.device-node');
    deviceNodes.forEach(node => {
        node.title = `Click to view ${node.dataset.device} details`;
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (!btn.title) {
            btn.title = `Click to ${btn.textContent.toLowerCase()}`;
        }
    });
}

function enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.setAttribute('role', 'tab');
        link.setAttribute('aria-selected', link.classList.contains('active'));
    });

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.setAttribute('role', 'tabpanel');
        section.setAttribute('aria-hidden', !section.classList.contains('active'));
    });

    // Add keyboard navigation for device nodes
    const deviceNodes = document.querySelectorAll('.device-node');
    deviceNodes.forEach(node => {
        node.setAttribute('tabindex', '0');
        node.setAttribute('role', 'button');
        node.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                node.click();
            }
        });
    });
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DigitalTwinsSystem;
}