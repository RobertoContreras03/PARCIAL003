module.exports = {
    content: ['./index.html', './pages/**/*.html', './js/**/*.js'],
    theme: {
        extend: {
            colors: {
                brand: { 50: '#f5f7ff', 100: '#eef2ff', 500: '#4f46e5', 600: '#4338ca' }
            },
            fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] }
        }
    },
    plugins: []
}