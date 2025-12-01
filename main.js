(function() {
    'use strict';
    console.info('[main.js] cargado');

    const $ = (s) => document.querySelector(s);
    const $$ = (s) => Array.from(document.querySelectorAll(s));


    (function setYear() {
        try {
            const y = document.getElementById('year');
            if (y) y.textContent = new Date().getFullYear();
        } catch (e) {
            console.error('[main.js] setYear error:', e);
        }
    })();


    (function mobileMenu() {
        try {
            const btnMenu = document.getElementById('btnMenu');
            const mobileMenu = document.getElementById('mobileMenu');
            const btnClose = document.getElementById('btnCloseMenu');
            if (!btnMenu || !mobileMenu) return;
            btnMenu.addEventListener('click', () => {
                const expanded = btnMenu.getAttribute('aria-expanded') === 'true';
                btnMenu.setAttribute('aria-expanded', String(!expanded));
                mobileMenu.classList.toggle('hidden');
                mobileMenu.setAttribute('aria-hidden', String(expanded));
            });
            if (btnClose) btnClose.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                btnMenu.setAttribute('aria-expanded', 'false');
            });
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    btnMenu.setAttribute('aria-expanded', 'false');
                }
            });
        } catch (e) {
            console.error('[main.js] mobileMenu error:', e);
        }
    })();


    (function testimonialsSlider() {
        try {
            const wrapper = document.querySelector('#slider > div');
            if (!wrapper) return;
            const slides = Array.from(wrapper.children);
            const total = slides.length;
            let idx = 0;
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            function show(i) {
                wrapper.style.transform = `translateX(-${i * 100}%)`;
            }
            if (prevBtn) prevBtn.addEventListener('click', () => {
                idx = (idx - 1 + total) % total;
                show(idx);
            });
            if (nextBtn) nextBtn.addEventListener('click', () => {
                idx = (idx + 1) % total;
                show(idx);
            });
        } catch (e) {
            console.error('[main.js] testimonialsSlider error:', e);
        }
    })();

    (function faqAccordion() {
        try {
            const buttons = document.querySelectorAll('.faq-btn');
            if (!buttons.length) return;
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const expanded = btn.getAttribute('aria-expanded') === 'true';
                    const target = document.getElementById(btn.getAttribute('aria-controls'));
                    if (!target) return;
                    btn.setAttribute('aria-expanded', String(!expanded));
                    if (expanded) target.classList.add('hidden');
                    else target.classList.remove('hidden');
                });
            });
        } catch (e) {
            console.error('[main.js] faqAccordion error:', e);
        }
    })();

    (function pricingSelect() {
        try {
            const buttons = document.querySelectorAll('.select-plan');
            if (!buttons.length) return;
            buttons.forEach(b => {
                b.addEventListener('click', (e) => {
                    const plan = e.currentTarget.dataset.plan || 'Plan';
                    const price = e.currentTarget.dataset.price || '0';
                    addToCart({ id: 'plan-' + plan.toLowerCase(), title: plan, price: price, qty: 1 });

                    window.location.href = 'pages/carrito.html';
                });
            });
        } catch (e) {
            console.error('[main.js] pricingSelect error:', e);
        }
    })();

    (function contactForm() {
        try {
            const form = document.getElementById('contactForm');
            if (!form) return;
            const showError = (id, show) => {
                const el = document.getElementById(id);
                if (!el) return;
                el.classList.toggle('hidden', !show);
            };
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                let valid = true;
                const name = document.getElementById('name'),
                    email = document.getElementById('email'),
                    msg = document.getElementById('message');
                if (!name.value.trim()) {
                    showError('nameError', true);
                    valid = false;
                } else showError('nameError', false);
                if (!/^\S+@\S+\.\S+$/.test(email.value)) {
                    showError('emailError', true);
                    valid = false;
                } else showError('emailError', false);
                if (!msg.value.trim()) {
                    showError('msgError', true);
                    valid = false;
                } else showError('msgError', false);
                if (!valid) return;
                alert('Formulario enviado (simulado). Gracias.');
                form.reset();
            });
        } catch (e) {
            console.error('[main.js] contactForm error:', e);
        }
    })();

    const CART_KEY = 'mi_carrito_v1';

    function getCart() {
        try {
            const raw = localStorage.getItem(CART_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error('[miCarrito] getCart error:', e);
            return [];
        }
    }

    function saveCart(cart) {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
        } catch (e) {
            console.error('[miCarrito] saveCart error:', e);
            throw e;
        }
    }


    function addToCart(item) {
        try {
            console.log('[miCarrito] addToCart llamado con:', item);
            const cart = getCart();
            console.log('[miCarrito] carrito antes:', cart);
            const found = cart.find(i => i.id === item.id);
            if (found) {
                found.qty = (found.qty || 1) + (item.qty || 1);
                console.log('[miCarrito] item existente — qty actualizada:', found);
            } else {
                cart.push(Object.assign({ qty: 1 }, item));
                console.log('[miCarrito] item agregado:', item);
            }
            saveCart(cart);
            console.log('[miCarrito] carrito guardado en localStorage:', cart);
            return cart;
        } catch (e) {
            console.error('[miCarrito] addToCart error:', e);

            try {
                const fallbackCart = getCart();
                fallbackCart.push(Object.assign({ qty: 1 }, item));
                localStorage.setItem(CART_KEY, JSON.stringify(fallbackCart));
                console.warn('[miCarrito] fallback guardado en localStorage');
                return fallbackCart;
            } catch (err) {
                console.error('[miCarrito] fallback error:', err);
                return [];
            }
        }
    }

    function removeFromCart(id) {
        try {
            let cart = getCart().filter(i => i.id !== id);
            saveCart(cart);
            return cart;
        } catch (e) {
            console.error('[miCarrito] removeFromCart error:', e);
            return getCart();
        }
    }

    function clearCart() {
        try {
            localStorage.removeItem(CART_KEY);
        } catch (e) {
            console.error('[miCarrito] clearCart error:', e);
        }
    }

    function renderCart(containerSelector = '#cartContainer') {
        try {
            const container = document.querySelector(containerSelector);
            if (!container) return;
            const cart = getCart();
            if (!cart.length) {
                container.innerHTML = `<div class="p-6 text-center"><p class="text-gray-600">Tu carrito está vacío.</p><a href="../pages/ofertas.html" class="mt-4 inline-block text-indigo-600">Continuar comprando</a></div>`;
                return;
            }
            let subtotal = 0;
            const rows = cart.map(item => {
                const priceNum = item.price ? parseFloat(String(item.price).replace(/[^0-9.-]+/g, "")) : 0;
                const line = priceNum * (item.qty || 1);
                subtotal += line;
                return `<div class="flex items-center justify-between py-3 border-b">
          <div><div class="font-semibold">${item.title}</div><div class="text-sm text-gray-500">Cantidad: ${item.qty}</div></div>
          <div class="text-right"><div class="font-medium">${item.price ? ('$' + priceNum.toFixed(2)) : '-'}</div><div class="mt-2"><button data-id="${item.id}" class="remove-item text-sm text-red-600">Eliminar</button></div></div>
        </div>`;
            }).join('');
            const shipping = 0;
            const total = subtotal + shipping;
            container.innerHTML = `<div class="bg-white p-4 rounded shadow">${rows}<div class="mt-4 text-right"><div class="text-sm text-gray-600">Subtotal: <strong>$${subtotal.toFixed(2)}</strong></div><div class="text-sm text-gray-600">Envío: <strong>$${shipping.toFixed(2)}</strong></div><div class="mt-2 text-lg font-bold">Total: $${total.toFixed(2)}</div><div class="mt-4 flex gap-3 justify-end"><button id="btnClearCart" class="px-4 py-2 border rounded">Vaciar</button><button id="btnCheckout" class="px-4 py-2 bg-indigo-600 text-white rounded">Proceder al pago</button></div></div></div>`;

            container.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    try {
                        removeFromCart(e.currentTarget.dataset.id);
                        renderCart(containerSelector);
                    } catch (err) {
                        console.error('[miCarrito] remove-item handler error:', err);
                    }
                });
            });
            const btnClear = document.getElementById('btnClearCart');
            if (btnClear) btnClear.addEventListener('click', () => {
                if (confirm('¿Vaciar carrito?')) {
                    clearCart();
                    renderCart(containerSelector);
                }
            });
            const btnCheckout = document.getElementById('btnCheckout');
            if (btnCheckout) btnCheckout.addEventListener('click', () => { alert('Simulación de pago'); });
        } catch (e) {
            console.error('[miCarrito] renderCart error:', e);
        }
    }


    try {
        window.miCarrito = { getCart, addToCart, removeFromCart, clearCart, renderCart };
        console.info('[main.js] window.miCarrito expuesto correctamente');
    } catch (e) {
        console.error('[main.js] error exponiendo miCarrito:', e);
    }

})();