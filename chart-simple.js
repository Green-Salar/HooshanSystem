// Simple Chart Implementation for Digital Twins Platform
class SimpleChart {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.config = config;
        this.data = config.data;
        this.options = config.options || {};
        
        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        this.width = rect.width;
        this.height = rect.height;
        
        this.draw();
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        if (this.config.type === 'line') {
            this.drawLineChart();
        } else if (this.config.type === 'bar') {
            this.drawBarChart();
        }
        
        this.drawLegend();
    }
    
    drawLineChart() {
        const padding = 40;
        const chartWidth = this.width - padding * 2;
        const chartHeight = this.height - padding * 2;
        
        // Draw grid
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let i = 0; i <= 10; i++) {
            const x = padding + (chartWidth / 10) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(x, padding);
            this.ctx.lineTo(x, padding + chartHeight);
            this.ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(padding + chartWidth, y);
            this.ctx.stroke();
        }
        
        // Draw data lines
        this.data.datasets.forEach((dataset, datasetIndex) => {
            this.ctx.strokeStyle = dataset.borderColor || '#667eea';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            
            const dataLength = dataset.data.length;
            const stepX = chartWidth / (dataLength - 1);
            
            // Find min/max for scaling
            const allData = this.data.datasets.flatMap(d => d.data);
            const minY = Math.min(...allData) * 0.9;
            const maxY = Math.max(...allData) * 1.1;
            const range = maxY - minY;
            
            dataset.data.forEach((value, index) => {
                const x = padding + stepX * index;
                const y = padding + chartHeight - ((value - minY) / range) * chartHeight;
                
                if (index === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            });
            
            this.ctx.stroke();
            
            // Draw fill area if specified
            if (dataset.fill) {
                this.ctx.fillStyle = dataset.backgroundColor || 'rgba(102, 126, 234, 0.1)';
                this.ctx.lineTo(padding + chartWidth, padding + chartHeight);
                this.ctx.lineTo(padding, padding + chartHeight);
                this.ctx.closePath();
                this.ctx.fill();
            }
        });
    }
    
    drawBarChart() {
        const padding = 40;
        const chartWidth = this.width - padding * 2;
        const chartHeight = this.height - padding * 2;
        
        const dataset = this.data.datasets[0];
        const barCount = dataset.data.length;
        const barWidth = chartWidth / barCount * 0.8;
        const barSpacing = chartWidth / barCount * 0.2;
        
        // Find max value for scaling
        const maxValue = Math.max(...dataset.data);
        
        dataset.data.forEach((value, index) => {
            const x = padding + (chartWidth / barCount) * index + barSpacing / 2;
            const barHeight = (value / maxValue) * chartHeight;
            const y = padding + chartHeight - barHeight;
            
            this.ctx.fillStyle = dataset.backgroundColor[index] || '#667eea';
            this.ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw value labels
            this.ctx.fillStyle = '#333';
            this.ctx.font = '12px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(value + '%', x + barWidth / 2, y - 5);
        });
        
        // Draw labels
        this.ctx.fillStyle = '#666';
        this.ctx.font = '11px sans-serif';
        this.ctx.textAlign = 'center';
        this.data.labels.forEach((label, index) => {
            const x = padding + (chartWidth / barCount) * index + (chartWidth / barCount) / 2;
            const y = padding + chartHeight + 20;
            this.ctx.fillText(label, x, y);
        });
    }
    
    drawLegend() {
        if (this.data.datasets.length <= 1) return;
        
        const legendY = 20;
        let legendX = this.width / 2 - 100;
        
        this.data.datasets.forEach((dataset, index) => {
            // Draw color box
            this.ctx.fillStyle = dataset.borderColor || dataset.backgroundColor || '#667eea';
            this.ctx.fillRect(legendX, legendY, 12, 12);
            
            // Draw label
            this.ctx.fillStyle = '#333';
            this.ctx.font = '12px sans-serif';
            this.ctx.textAlign = 'start';
            this.ctx.fillText(dataset.label, legendX + 16, legendY + 9);
            
            legendX += 120;
        });
    }
    
    update(mode) {
        this.draw();
    }
}

// Global Chart object to replace Chart.js
window.Chart = SimpleChart;