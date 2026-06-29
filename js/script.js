// Coffeenak Coffee Shop - script.js
// Menyimpan data menu kopi dan keranjang di localStorage
// Ditulis dengan gaya minimal dan elegan sesuai panduan desain modern

(() => {
  'use strict';

  // Kunci localStorage
  const STORAGE_KEYS = {
    COFFEES: 'coffeenak_coffees',
    CART: 'coffeenak_cart',
    PAYMENTS: 'coffeenak_payments'
  };

  // Data menu kopi default jika belum ada di localStorage
  const defaultCoffees = [
    {
      id: 1,
      name: "Americano Iced",
      desc: "Espresso shoot yang dicampur dengan segelas air menghadirkan karakter, aroma, dan rasa yang ideal.",
      price: 22000,
      img: "img/Americano Iced.jpeg"
    },
    {
      id: 2,
      name: "Cappuccino Iced",
      desc: "Paduan Espresso, susu hangat, dan lapisan foam tebal di atasnya tanpa gula tambahan.",
      price: 29000,
      img: "img/Capucino Iced.jpg"
    },
    {
      id: 3,
      name: "Cafe Latte Iced",
      desc: "Paduan espresso dengan susu sapi pilihan dan sedikit foam tanpa gula tambahan.",
      price: 29000,
      img: "img/Cafe Latte Iced.jpg"
    },
    {
      id: 4,
      name: "Hot Espresso",
      desc: "Ekstrak biji kopi Arabika murni tanpa campuran",
      price: 19000,
      img: "img/espresso.jpg"
    },
    {
      id: 5,
      name: "Berry Manuka Americano",
      desc: "Perpaduan rasa Stroberi dan Manuka dengan Classic Blend Fore yang menyegarkan",
      price: 31000,
      img: "img/Berry Manuka Americano.jpg"
    },
    {
      id: 6,
      name: "Caremel Praline Macchiato Iced",
      desc: "Paduan klasik 2 shot espresso dengan susu dan krim",
      price: 33000,
      img: "img/Caramel Praline Macchiato Iced.jpg"
    },
    {
      id: 7,
      name: "Double Iced Shanken Latte",
      desc: "Espresso dengan tambahan air panas, rasa kaya dan kuat.",
      price: 26000,
      img: "img/Double Iced Shaken Latte.jpg"
    },
    {
      id: 8,
      name: "Manuka Americano Iced",
      desc: "Americano dengan madu Manuka yang pas untuk jadi energy booster.",
      price: 29000,
      img: "img/Manuka Americano Iced.jpg"
    },
    {
      id: 9,
      name: "Nutty Oat Latte Iced",
      desc: "Espresso dari biji kopi khas nusantara dipadukan susu oat gluten-free dan sensasi nutty dari hazelnut.",
      price: 39000,
      img: "img/Nutty Oat Latte Iced.jpg"
    },
    {
      id: 10,
      name: "Triple Peach Americano",
      desc: "Peach coffee perpaduan rasa kopi, tiga jenis buah peach dan aroma elderflower yang menciptakan sensasi kopi yang segar dan harmonis.",
      price: 29000,
      img: "img/Triple Peach Americano.jpg"
    }
  ];

  // Element DOM cache
  const coffeeListEl = document.getElementById('coffee-list');
  const coffeeDetailEl = document.getElementById('coffee-detail');
  const detailNameEl = document.getElementById('detail-name');
  const detailPriceEl = document.getElementById('detail-price');
  const detailDescEl = document.getElementById('detail-desc');
  const addToCartBtn = document.getElementById('btn-add-to-cart');

  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  const cartContainer = document.getElementById('cart');
  const btnCartToggle = document.getElementById('btn-cart');

  const btnClearCart = document.getElementById('btn-clear-cart');
  const btnCheckout = document.getElementById('btn-checkout');

  const btnHome = document.getElementById('btn-home');
  const btnMenu = document.getElementById('btn-menu');
  const btnAbout = document.getElementById('btn-about');
  const sections = document.querySelectorAll('.content-section');
  const nav = document.querySelector('.nav');
  const hamburgerMenu = document.getElementById('hamburger-menu');

  let coffees = [];
  let cart = [];
  let selectedCoffee = null;

  // Muat data kopi dari localStorage atau pakai default
  function loadCoffeeData() {
    const data = localStorage.getItem(STORAGE_KEYS.COFFEES);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        localStorage.removeItem(STORAGE_KEYS.COFFEES);
      }
    }
    localStorage.setItem(STORAGE_KEYS.COFFEES, JSON.stringify(defaultCoffees));
    return [...defaultCoffees];
  }

  // Simpan data kopi ke localStorage
  function saveCoffeeData(updatedCoffees) {
    localStorage.setItem(STORAGE_KEYS.COFFEES, JSON.stringify(updatedCoffees));
  }

  // Muat data keranjang dari localStorage atau kosongkan
  function loadCartData() {
    const data = localStorage.getItem(STORAGE_KEYS.CART);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        localStorage.removeItem(STORAGE_KEYS.CART);
      }
    }
    return [];
  }

  // Simpan data keranjang ke localStorage
  function saveCartData(updatedCart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updatedCart));
  }

  // Muat data riwayat pembayaran dari localStorage atau kosongkan
  function loadPaymentHistory() {
    const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
      }
    }
    return [];
  }

  // Simpan data riwayat pembayaran ke localStorage
  function savePaymentHistory(history) {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(history));
  }

  // Render daftar kopi di menu
  function renderCoffeeList() {
    coffeeListEl.innerHTML = '';
    coffees.forEach(coffee => {
      const div = document.createElement('div');
      div.className = 'menu-item';
      div.dataset.id = coffee.id;
      div.title = coffee.name;
      div.innerHTML = `
        <img src="${coffee.img}" alt="${coffee.name}" />
        <span class="coffee-name">${coffee.name}</span>
      `;
      div.addEventListener('click', () => {
        selectCoffee(coffee.id);
      });
      coffeeListEl.appendChild(div);
    });
    if(coffees.length) selectCoffee(coffees[0].id);
  }

  // Tampilkan detail kopi terpilih
  function selectCoffee(coffeeId) {
    const coffee = coffees.find(c => c.id === coffeeId);
    if (!coffee) return;
    selectedCoffee = coffee;

    Array.from(coffeeListEl.children).forEach(div => {
      div.classList.toggle('selected', Number(div.dataset.id) === coffeeId);
    });

    detailNameEl.textContent = coffee.name;
    detailPriceEl.textContent = coffee.price.toLocaleString('id-ID');
    detailDescEl.textContent = coffee.desc;
    coffeeDetailEl.classList.remove('hidden');
    addToCartBtn.disabled = false;
    addToCartBtn.setAttribute('aria-label', `Tambah ${coffee.name} ke keranjang`);
  }

  // Tambah kopi terpilih ke keranjang
  function addToCart() {
    if (!selectedCoffee) return;
    const found = cart.find(item => item.id === selectedCoffee.id);
    if (found) {
      found.qty++;
    } else {
      cart.push({ ...selectedCoffee, qty: 1 });
    }
    saveCartData(cart);
    updateCartUI();
    if (cartContainer.classList.contains('hidden')) toggleCartVisibility(true);
  }

  // Hapus item dari keranjang berdasarkan id
  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartData(cart);
    updateCartUI();
  }

  // Kosongkan keranjang dengan konfirmasi
  function clearCart() {
    if (!cart.length) {
      alert('Keranjang sudah kosong.');
      return;
    }
    if (confirm('Apakah Anda yakin ingin mengosongkan semua item dalam keranjang?')) {
      cart = [];
      saveCartData(cart);
      updateCartUI();
    }
  }

  // Proses pembayaran (checkout)
  // Proses pembayaran QRIS + kirim ke WhatsApp
function checkout() {

    if (!cart.length) {
        alert('Keranjang kosong, silakan tambahkan produk terlebih dahulu.');
        return;
    }

    // Hitung total
    const total = cart.reduce(
        (acc, item) => acc + (item.price * item.qty),
        0
    );

    // Buat daftar pesanan
    let daftarPesanan = "";

    cart.forEach(item => {
        daftarPesanan +=
        `☕ ${item.name} x${item.qty}\n` +
        `Rp ${(item.price * item.qty).toLocaleString('id-ID')}\n\n`;
    });

    // Nomor WhatsApp tujuan
    // GANTI pakai nomor kamu
    const nomorWA = "6282286511919";

    // Link gambar QRIS kamu
    // simpan file qris.png di folder img
    const qrisImage = "img/qris.png";


    // Popup pembayaran QRIS
    const popup = document.createElement("div");

    popup.innerHTML = `
    
    <div style="
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.7);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:9999;
    ">

        <div style="
        background:white;
        padding:25px;
        border-radius:15px;
        text-align:center;
        width:320px;
        ">

            <h2>Pembayaran QRIS</h2>

            <img 
            src="${qrisImage}"
            width="250"
            style="margin:15px 0; border-radius:10px;"
            >

            <p>
            Total Pembayaran
            </p>

            <h3>
            Rp ${total.toLocaleString('id-ID')}
            </h3>

            <button id="btnSudahBayar"
            style="
            background:#27ae60;
            color:white;
            border:none;
            padding:10px 20px;
            border-radius:8px;
            cursor:pointer;
            margin-top:10px;
            ">
            Saya Sudah Bayar
            </button>

        </div>

    </div>
    
    `;

    document.body.appendChild(popup);


    document
    .getElementById("btnSudahBayar")
    .addEventListener("click",()=>{

        let pesanWA = 
`Halo Coffeenak, saya ingin memesan:

${daftarPesanan}

Total: Rp ${total.toLocaleString('id-ID')}

Saya sudah melakukan pembayaran QRIS`;

        const urlWA =
`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanWA)}`;

        window.open(urlWA,"_blank");

        // Hapus keranjang
        cart = [];

        saveCartData(cart);

        updateCartUI();

        toggleCartVisibility(false);

        popup.remove();

    });


    // Simpan transaksi ke riwayat pembayaran
    const paymentHistory = loadPaymentHistory();
    const timestamp = new Date().toISOString();
    const transactionRecord = {
      id: timestamp,
      date: timestamp,
      items: cart.map(({id, name, qty, price}) => ({id, name, qty, price})),
      total: total
    };
    paymentHistory.push(transactionRecord);
    savePaymentHistory(paymentHistory);

    // Bersihkan keranjang setelah pembayaran
    cart = [];
    saveCartData(cart);
    updateCartUI();
    toggleCartVisibility(false);
  }

  // Perbarui tampilan keranjang
  function updateCartUI() {
    if (!cart.length) {
      cartItemsEl.innerHTML = '<em>Keranjang Anda kosong.</em>';
      cartTotalSpan.textContent = '0';
      return;
    }
    cartItemsEl.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <span>${item.name} x${item.qty}</span>
        <span>Rp ${(item.price * item.qty).toLocaleString('id-ID')}</span>
        <button aria-label="Kurangi jumlah" class="btn-decrease">-</button>
        <button aria-label="Tambah jumlah" class="btn-increase">+</button>
        <button aria-label="Hapus dari keranjang">&times;</button>
      `;
      div.querySelector('.btn-increase').addEventListener('click', () => {
        item.qty++;
        saveCartData(cart);
        updateCartUI();
      });
      div.querySelector('.btn-decrease').addEventListener('click', () => {
        if (item.qty > 1) {
          item.qty--;
        } else {
          removeFromCart(item.id);
        }
        saveCartData(cart);
        updateCartUI();
      });
      div.querySelector('button[aria-label="Hapus dari keranjang"]').addEventListener('click', () => {
        removeFromCart(item.id);
      });
      cartItemsEl.appendChild(div);
    });
    cartTotalSpan.textContent = total.toLocaleString('id-ID');
  }

  // Tampilkan atau sembunyikan panel keranjang
  function toggleCartVisibility(show) {
    if (show) {
      cartContainer.classList.add('visible');
      cartContainer.classList.remove('hidden');
      btnCartToggle.setAttribute('aria-pressed', 'true');
    } else {
      cartContainer.classList.add('hidden');
      cartContainer.classList.remove('visible');
      btnCartToggle.setAttribute('aria-pressed', 'false');
    }
  }

  // Navigasi antar bagian content
  function showSection(id) {
    sections.forEach(s => {
      s.style.display = s.id === id ? 'block' : 'none';
    });
    btnHome.classList.toggle('active', id === 'home');
    btnMenu.classList.toggle('active', id === 'menu');
    btnAbout.classList.toggle('active', id === 'about');
    nav.classList.remove('active');
    addToCartBtn.disabled = (id !== 'menu');
  }

  // Event listeners tombol navigasi
  btnHome.addEventListener('click', () => showSection('home'));
  btnMenu.addEventListener('click', () => {
    showSection('menu');
    renderCoffeeList();
  });
  btnAbout.addEventListener('click', () => showSection('about'));

  // Toggle hamburger menu untuk layar kecil
  hamburgerMenu.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
  hamburgerMenu.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      nav.classList.toggle('active');
    }
  });

  // Tombol tambah ke keranjang
  addToCartBtn.addEventListener('click', addToCart);

  // Tombol toggle keranjang
  btnCartToggle.addEventListener('click', () => {
    toggleCartVisibility(!cartContainer.classList.contains('visible'));
  });

  // Tombol kosongkan keranjang
  btnClearCart.addEventListener('click', clearCart);

  // Tombol bayar / checkout
  btnCheckout.addEventListener('click', checkout);

  // Inisialisasi aplikasi
  function init() {
    coffees = loadCoffeeData();
    cart = loadCartData();
    showSection('home');
    renderCoffeeList();
    updateCartUI();
    toggleCartVisibility(false);
    addToCartBtn.disabled = true;
  }

  init();

})();
