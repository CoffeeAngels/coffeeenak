(() => {
        'use strict';

        // Data menu kopi dengan detail lengkap
        const coffees = [
            {
                id: 1,
                name: "Americano Iced",
                desc: "Espresso shoot yang dicampur dengan segelas air menghadirkan karakter, aroma, dan rasa yang ideal. Minuman ini cocok untuk mereka yang menyukai kopi kuat tapi segar. Disajikan dengan es batu untuk sensasi yang lebih menyegarkan.",
                price: 22000,
                img: "img/Americano Iced.jpeg",
                ingredients: ["Expresso shot", "Air", "Es batu"],
                calories: 15,
                size: "Regular (350ml)",
                rating: 4.5
            },
            {
                id: 2,
                name: "Cappuccino Iced",
                desc: "Paduan Espresso, susu hangat, dan lapisan foam tebal di atasnya tanpa gula tambahan. Tekstur yang creamy dengan rasa kopi yang kuat namun seimbang. Cocok dinikmati kapan saja.",
                price: 29000,
                img: "img/Capucino Iced.jpg",
                ingredients: ["Expresso shot", "Susu segar", "Foam susu"],
                calories: 120,
                size: "Regular (350ml)",
                rating: 4.7
            },
            {
                id: 3,
                name: "Cafe Latte Iced",
                desc: "Paduan espresso dengan susu sapi pilihan dan sedikit foam tanpa gula tambahan. Rasa yang creamy dan nikmat dengan dominasi rasa susu yang lebih kuat dibanding cappuccino.",
                price: 29000,
                img: "img/Cafe Latte Iced.jpg",
                ingredients: ["Expresso shot", "Susu segar", "Foam tipis"],
                calories: 130,
                size: "Regular (350ml)",
                rating: 4.6
            },
            {
                id: 4,
                name: "Hot Espresso",
                desc: "Ekstrak biji kopi Arabika murni tanpa campuran. Rasa yang kuat dan pekat untuk penikmat kopi sejati. Disajikan dalam cangkir kecil untuk menikmati kopi dalam konsentrasi tinggi.",
                price: 19000,
                img: "img/espresso.jpg",
                ingredients: ["Biji kopi Arabika", "Air panas"],
                calories: 5,
                size: "Small (90ml)",
                rating: 4.8
            },
            {
                id: 5,
                name: "Berry Manuka Americano",
                desc: "Perpaduan rasa Stroberi dan Manuka dengan Classic Blend Fore yang menyegarkan. Diseduh dengan teknik khusus untuk menghasilkan lapisan warna yang indah.",
                price: 31000,
                img: "img/Berry Manuka Americano.jpg",
                ingredients: ["Expresso shot", "Sirup stroberi", "Madu manuka", "Air soda"],
                calories: 90,
                size: "Tall (450ml)",
                rating: 4.9
            },
            {
                id: 6,
                name: "Caremel Praline Macchiato Iced",
                desc: "Paduan klasik 2 shot espresso dengan susu dan krim. Ditambah dengan caramel dan praline yang memberikan rasa manis alami.",
                price: 33000,
                img: "img/Caramel Praline Macchiato Iced.jpg",
                ingredients: ["Double expresso shot", "Susu steamed", "Caramel sauce", "Praline crumble"],
                calories: 210,
                size: "Grande (500ml)",
                rating: 4.8
            },
            {
                id: 7,
                name: "Double Iced Shanken Latte",
                desc: "Espresso dengan tambahan air panas, rasa kaya dan kuat. Variasi latte yang lebih ringan dengan rasa kopi yang tetap terasa.",
                price: 26000,
                img: "img/Double Iced Shaken Latte.jpg",
                ingredients: ["Expresso shot", "Susu rendah lemak", "Es kocok"],
                calories: 80,
                size: "Tall (450ml)",
                rating: 4.4
            },
            {
                id: 8,
                name: "Manuka Americano Iced",
                desc: "Americano dengan madu Manuka yang pas untuk jadi energy booster. Rasa kopi yang kuat dipadukan dengan manis alami madu premium.",
                price: 29000,
                img: "img/Manuka Americano Iced.jpg",
                ingredients: ["Expresso shot", "Madu manuka", "Es batu"],
                calories: 60,
                size: "Regular (350ml)",
                rating: 4.7
            },
            {
                id: 9,
                name: "Nutty Oat Latte Iced",
                desc: "Espresso dari biji kopi khas nusantara dipadukan susu oat gluten-free dan sensasi nutty dari hazelnut. Pilihan sehat untuk penikmat kopi.",
                price: 39000,
                img: "img/Nutty Oat Latte Iced.jpg",
                ingredients: ["Expresso shot", "Susu oat", "Sirup hazelnut"],
                calories: 95,
                size: "Grande (500ml)",
                rating: 4.5
            },
            {
                id: 10,
                name: "Triple Peach Americano",
                desc: "Peach coffee perpaduan rasa kopi, tiga jenis buah peach dan aroma elderflower yang menciptakan sensasi kopi yang segar dan harmonis.",
                price: 29000,
                img: "img/Triple Peach Americano.jpg",
                ingredients: ["Expresso shot", "Peach puree", "Elderflower syrup"],
                calories: 110,
                size: "Tall (450ml)",
                rating: 4.3
            }
        ];

        // Element DOM cache
        const menuRow1 = document.getElementById('menu-row-1');
        const menuRow2 = document.getElementById('menu-row-2');
        const btnHome = document.getElementById('btn-home');
        const btnMenu = document.getElementById('btn-menu');
        const btnAbout = document.getElementById('btn-about');
        const sections = document.querySelectorAll('.content-section');
        const nav = document.querySelector('.nav');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const modalOverlay = document.querySelector('.modal-overlay');
        const modalTitle = modalOverlay.querySelector('.modal-title');
        const modalImage = modalOverlay.querySelector('.modal-image');
        const modalPrice = modalOverlay.querySelector('.modal-price');
        const modalDesc = modalOverlay.querySelector('.modal-desc');
        const modalIngredients = modalOverlay.querySelector('.modal-ingredients');
        const modalCalories = modalOverlay.querySelector('.modal-calories');
        const modalClose = modalOverlay.querySelector('.modal-close');
        const modalOrderBtn = modalOverlay.querySelector('.modal-order-btn');

        // Render menu kopi dalam 2 baris horizontal
        function renderMenu() {
            menuRow1.innerHTML = '';
            menuRow2.innerHTML = '';

            // Bagi menu menjadi 2 baris (5 item per baris)
            const firstRow = coffees.slice(0, 5);
            const secondRow = coffees.slice(5);

            firstRow.forEach(coffee => {
                const item = createMenuItem(coffee);
                menuRow1.appendChild(item);
            });

            secondRow.forEach(coffee => {
                const item = createMenuItem(coffee);
                menuRow2.appendChild(item);
            });

            // Tambahkan event listener untuk setiap item menu
            document.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    // Pastikan event tidak berasal dari tombol di dalam menu item
                    if (!e.target.closest('.add-to-cart-btn')) {
                        const coffeeId = parseInt(item.dataset.id);
                        const selectedCoffee = coffees.find(c => c.id === coffeeId);
                        showModal(selectedCoffee);
                    }
                });
            });
        }

        // Buat elemen menu item dengan tombol tambahan
        function createMenuItem(coffee) {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.dataset.id = coffee.id;
            div.innerHTML = `
                <img src="${coffee.img}" alt="${coffee.name}" loading="lazy">
                <div class="menu-info">
                    <div class="menu-item-name">${coffee.name}</div>
                    <div class="menu-item-price">Rp ${coffee.price.toLocaleString('id-ID')}</div>
                    <div class="menu-item-desc">${coffee.desc.substring(0, 60)}...</div>
                </div>
            `;
            
            return div;
        }

        // Tampilkan modal detail
        function showModal(coffee) {
            modalTitle.textContent = coffee.name;
            modalImage.src = coffee.img;
            modalImage.alt = coffee.name;
            modalPrice.textContent = `Rp ${coffee.price.toLocaleString('id-ID')}`;
            modalDesc.textContent = coffee.desc;
            modalIngredients.innerHTML = `<strong>Bahan:</strong> ${coffee.ingredients.join(', ')}`;
            modalCalories.innerHTML = `<strong>Kalori:</strong> ${coffee.calories} kkal`;
            
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Sembunyikan modal
        function hideModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Navigasi antar section
        function showSection(id) {
            sections.forEach(s => {
                s.style.display = s.id === id ? 'block' : 'none';
            });
            
            // Update active button
            btnHome.classList.toggle('active', id === 'home');
            btnMenu.classList.toggle('active', id === 'menu');
            btnAbout.classList.toggle('active', id === 'about');
            
            // Tutup hamburger menu jika terbuka
            nav.classList.remove('active');
            
            // Render ulang menu ketika section menu ditampilkan
            if (id === 'menu') {
                renderMenu();
            }
        }

        // Event listeners untuk navigasi
        btnHome.addEventListener('click', () => showSection('home'));
        btnMenu.addEventListener('click', () => showSection('menu'));
        btnAbout.addEventListener('click', () => showSection('about'));
        
        // Hamburger menu toggle
        hamburgerMenu.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
        
        hamburgerMenu.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                nav.classList.toggle('active');
            }
        });

        // Modal event listeners
        modalClose.addEventListener('click', hideModal);
        modalOrderBtn.addEventListener('click', () => {
            alert(`Pesanan ${modalTitle.textContent} Anda telah diterima! Terima kasih.`);
            hideModal();
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                hideModal();
            }
        });

        // Tutup modal dengan Esc key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                hideModal();
            }
        });

        // Inisialisasi aplikasi
        function init() {
            showSection('home');
        }

        init();
    })();
