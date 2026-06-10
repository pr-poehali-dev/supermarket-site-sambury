import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/29c36aab-77eb-4628-8817-3497f3958db6/files/71c47e63-72c0-41bd-97c6-dd0849a617ad.jpg";

const PRODUCTS = [
  { id: 1, name: "Молоко «Коровий восторг»", price: 89, oldPrice: 120, emoji: "🥛", tag: "Хит!", category: "Молочка", discount: 26 },
  { id: 2, name: "Хлеб «Философский»", price: 45, oldPrice: null, emoji: "🍞", tag: null, category: "Выпечка", discount: 0 },
  { id: 3, name: "Колбаса «Привет, живот!»", price: 299, oldPrice: 389, emoji: "🌭", tag: "-23%", category: "Мясо", discount: 23 },
  { id: 4, name: "Сыр «Дырявый характер»", price: 189, oldPrice: null, emoji: "🧀", tag: null, category: "Молочка", discount: 0 },
  { id: 5, name: "Апельсины «Солнечные»", price: 99, oldPrice: 140, emoji: "🍊", tag: "Акция", category: "Фрукты", discount: 29 },
  { id: 6, name: "Шоколад «Настроение»", price: 129, oldPrice: 179, emoji: "🍫", tag: "-28%", category: "Сладости", discount: 28 },
  { id: 7, name: "Кофе «Пробуждение»", price: 349, oldPrice: null, emoji: "☕", tag: "Новинка", category: "Напитки", discount: 0 },
  { id: 8, name: "Картошка «Земляная»", price: 39, oldPrice: 55, emoji: "🥔", tag: "Дёшево!", category: "Овощи", discount: 29 },
  { id: 9, name: "Яйца «Куриный сюрприз»", price: 110, oldPrice: null, emoji: "🥚", tag: null, category: "Молочка", discount: 0 },
  { id: 10, name: "Сок «Восход»", price: 79, oldPrice: 99, emoji: "🧃", tag: "-20%", category: "Напитки", discount: 20 },
  { id: 11, name: "Масло «Золотое»", price: 159, oldPrice: null, emoji: "🧈", tag: null, category: "Молочка", discount: 0 },
  { id: 12, name: "Мороженое «Арктика»", price: 59, oldPrice: 79, emoji: "🍦", tag: "Лето!", category: "Сладости", discount: 25 },
];

const SPECIALS = [
  { title: "Карта «Самбери-Клуб»", desc: "Скидка 5% на всё! Плюс двойные баллы по пятницам. Карту выдаём бесплатно — нужен только паспорт и желание экономить.", emoji: "💳", color: "from-orange-400 to-yellow-400", badge: "5% скидка" },
  { title: "«Счастливые часы»", desc: "С 10:00 до 12:00 каждый день — скидки до 30% на свежую выпечку. Приходите, пока хлеб горячий!", emoji: "⏰", color: "from-green-400 to-teal-400", badge: "до -30%" },
  { title: "«Понедельник — день скидок»", desc: "Каждый понедельник выбираем 20 товаров и режем цены пополам. Список на кассе и в нашем Telegram!", emoji: "🎰", color: "from-purple-400 to-pink-400", badge: "-50% на 20 товаров" },
];

const CATEGORIES = ["Все", "Молочка", "Мясо", "Выпечка", "Фрукты", "Овощи", "Напитки", "Сладости"];

const MARQUEE_ITEMS = ["🥳 Скидки до 50%", "🛒 Бесплатная доставка от 1500р", "🧀 Свежие продукты каждый день", "🎁 Подарки для держателей карт", "🍎 Фрукты прямо с грядки", "💥 Ударные цены каждый день"];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [mobileMenu, setMobileMenu] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => {
    const p = PRODUCTS.find(p => p.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);

  const addToCart = (id: number) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === id);
      if (ex) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty - 1) } : i).filter(i => i.qty > 0));
  };

  const filteredProducts = activeCategory === "Все"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const navItems = [
    { id: "home", label: "Главная", emoji: "🏠" },
    { id: "catalog", label: "Каталог", emoji: "🛍️" },
    { id: "specials", label: "Акции", emoji: "🔥" },
    { id: "delivery", label: "Доставка", emoji: "🚚" },
    { id: "contacts", label: "Контакты", emoji: "📞" },
  ];

  return (
    <div className="min-h-screen bg-white font-rubik">

      {/* НАВИГАЦИЯ */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-sambery-orange shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <button
            onClick={() => setActiveSection("home")}
            className="font-pacifico text-2xl text-sambery-orange hover:scale-105 transition-transform"
          >
            🛒 Самбери
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`nav-link font-rubik font-600 text-sm transition-colors ${activeSection === item.id ? "text-sambery-orange font-bold" : "text-gray-700 hover:text-sambery-orange"}`}
              >
                {item.emoji} {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSection("cart")}
              className="relative bg-sambery-orange text-white px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Icon name="ShoppingCart" size={18} />
              Корзина
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-sambery-red text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-price-pop">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden text-gray-700" onClick={() => setMobileMenu(!mobileMenu)}>
              <Icon name={mobileMenu ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-orange-50 border-t border-orange-100 px-4 py-3 flex flex-col gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenu(false); }}
                className={`text-left px-3 py-2 rounded-lg font-semibold text-sm ${activeSection === item.id ? "bg-sambery-orange text-white" : "text-gray-700"}`}
              >
                {item.emoji} {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* БЕГУЩАЯ СТРОКА */}
      <div className="bg-sambery-yellow overflow-hidden py-2 border-b-2 border-orange-300">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-sambery-dark font-bold text-sm mx-8">{item}</span>
          ))}
        </div>
      </div>

      {/* ===== ГЛАВНАЯ ===== */}
      {activeSection === "home" && (
        <main>
          {/* HERO */}
          <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 min-h-[90vh] flex items-center relative overflow-hidden">
            {/* Декоративные кружки */}
            <div className="absolute top-10 left-8 w-20 h-20 bg-sambery-yellow rounded-full opacity-60 animate-bounce-slow" />
            <div className="absolute bottom-20 right-12 w-32 h-32 bg-orange-200 rounded-full opacity-50 animate-float" style={{animationDelay: '1s'}} />
            <div className="absolute top-1/2 left-4 w-12 h-12 bg-green-200 rounded-full opacity-70 animate-spin-slow" />
            <div className="absolute top-16 right-1/3 text-5xl animate-wobble">⭐</div>
            <div className="absolute bottom-32 left-1/4 text-4xl animate-float" style={{animationDelay:'0.5s'}}>🍎</div>
            <div className="absolute top-1/3 right-8 text-3xl animate-bounce-slow" style={{animationDelay:'0.8s'}}>🥕</div>

            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-20">
              <div className="animate-slide-in-up">
                <div className="inline-flex items-center gap-2 bg-sambery-yellow text-sambery-dark px-4 py-2 rounded-full text-sm font-bold mb-6 rotate-[-2deg]">
                  😂 Самый весёлый магазин города!
                </div>
                <h1 className="font-pacifico text-5xl md:text-7xl text-sambery-dark leading-tight mb-6">
                  Самбери —<br />
                  <span className="text-sambery-orange">тут вкусно</span><br />
                  и дёшево!
                </h1>
                <p className="text-lg text-gray-600 mb-8 font-rubik leading-relaxed">
                  Мы не просто продаём продукты — мы дарим настроение! 
                  Скидки, акции, карта постоянного покупателя и продавцы, 
                  которые (почти) всегда улыбаются 😄
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveSection("catalog")}
                    className="bg-sambery-orange text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-xl transition-all"
                  >
                    🛍️ Смотреть каталог
                  </button>
                  <button
                    onClick={() => setActiveSection("specials")}
                    className="bg-sambery-yellow text-sambery-dark px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-xl transition-all"
                  >
                    🔥 Акции сегодня
                  </button>
                </div>

                <div className="flex gap-8 mt-10">
                  {[["10 000+", "счастливых клиентов"], ["500+", "товаров"], ["24/7", "доставка"]].map(([num, lbl]) => (
                    <div key={lbl} className="text-center">
                      <div className="font-pacifico text-2xl text-sambery-orange">{num}</div>
                      <div className="text-xs text-gray-500 font-semibold">{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center animate-hero-pop">
                <div className="relative">
                  <img
                    src={HERO_IMG}
                    alt="Самбери супермаркет"
                    className="w-full max-w-md rounded-3xl shadow-2xl border-4 border-sambery-orange"
                  />
                  <div className="absolute -top-4 -right-4 bg-sambery-red text-white font-pacifico text-lg px-5 py-3 rounded-2xl rotate-[8deg] shadow-lg animate-price-pop">Скидки до 50% , иногда</div>
                  <div className="absolute -bottom-4 -left-4 bg-sambery-yellow text-sambery-dark font-bold text-sm px-4 py-2 rounded-xl rotate-[-5deg] shadow-md">
                    🎉 Открыто каждый день!
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* КАТЕГОРИИ-БЫСТРЫЙ ПЕРЕХОД */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="font-pacifico text-4xl text-center text-sambery-dark mb-10">
                Что ищем? 🤔
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { emoji: "🥛", label: "Молочка", cat: "Молочка", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
                  { emoji: "🥩", label: "Мясо", cat: "Мясо", color: "bg-red-50 border-red-200 hover:bg-red-100" },
                  { emoji: "🍎", label: "Фрукты", cat: "Фрукты", color: "bg-green-50 border-green-200 hover:bg-green-100" },
                  { emoji: "🍫", label: "Сладости", cat: "Сладости", color: "bg-pink-50 border-pink-200 hover:bg-pink-100" },
                  { emoji: "🥕", label: "Овощи", cat: "Овощи", color: "bg-orange-50 border-orange-200 hover:bg-orange-100" },
                  { emoji: "☕", label: "Напитки", cat: "Напитки", color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100" },
                  { emoji: "🍞", label: "Выпечка", cat: "Выпечка", color: "bg-amber-50 border-amber-200 hover:bg-amber-100" },
                  { emoji: "🔥", label: "Акции", cat: "Все", color: "bg-red-50 border-sambery-orange hover:bg-orange-50" },
                ].map(c => (
                  <button
                    key={c.label}
                    onClick={() => { setActiveCategory(c.cat); setActiveSection("catalog"); }}
                    className={`${c.color} border-2 rounded-2xl p-5 text-center card-hover cursor-pointer transition-all`}
                  >
                    <div className="text-4xl mb-2">{c.emoji}</div>
                    <div className="font-bold text-gray-800 text-sm">{c.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ХИТЫ ПРОДАЖ */}
          <section className="py-16 bg-orange-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-pacifico text-4xl text-sambery-dark">Хиты продаж 🏆</h2>
                <button onClick={() => setActiveSection("catalog")} className="text-sambery-orange font-bold hover:underline">
                  Все товары →
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCTS.filter(p => p.discount > 0).slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} cartQty={cart.find(i => i.id === p.id)?.qty || 0} onRemove={removeFromCart} />
                ))}
              </div>
            </div>
          </section>

          {/* ПОЧЕМУ МЫ */}
          <section className="py-20 bg-sambery-dark text-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="font-pacifico text-4xl mb-4 text-sambery-yellow">Почему Самбери?</h2>
              <p className="text-orange-200 mb-12 text-lg">Ну, кроме того что мы просто замечательные 😇</p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { emoji: "🫀", title: "Душевно", desc: "Наши продавцы знают всех покупателей по именам. Или делают вид, что знают — на результат не влияет." },
                  { emoji: "💸", title: "Выгодно", desc: "Цены как у бабушки на рынке, но без торга. Хотя... попробуйте поторговаться, ничего не обещаем." },
                  { emoji: "🚀", title: "Быстро", desc: "Доставка за 2 часа. Если опоздаем — получите купон. Но мы не опаздываем (почти никогда)." },
                ].map(f => (
                  <div key={f.title} className="bg-white/10 rounded-3xl p-8 card-hover">
                    <div className="text-5xl mb-4">{f.emoji}</div>
                    <h3 className="font-pacifico text-2xl text-sambery-yellow mb-3">{f.title}</h3>
                    <p className="text-orange-100 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ===== КАТАЛОГ ===== */}
      {activeSection === "catalog" && (
        <section className="py-12 max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-pacifico text-5xl text-sambery-dark mb-3">Каталог товаров 🛍️</h2>
            <p className="text-gray-500 text-lg">Выбирай на здоровье! (Буквально — мы продаём только полезное. Ну, почти.)</p>
          </div>

          {/* Фильтры */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all border-2 ${
                  activeCategory === cat
                    ? "bg-sambery-orange text-white border-sambery-orange scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:border-sambery-orange hover:text-sambery-orange"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((p, i) => (
              <div key={p.id} className="animate-slide-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={p} onAdd={addToCart} cartQty={cart.find(c => c.id === p.id)?.qty || 0} onRemove={removeFromCart} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== КОРЗИНА ===== */}
      {activeSection === "cart" && (
        <section className="py-12 max-w-3xl mx-auto px-4">
          <h2 className="font-pacifico text-5xl text-sambery-dark text-center mb-3">Корзина 🛒</h2>
          <p className="text-center text-gray-500 mb-10">
            {cart.length === 0 ? "Пусто как в кошельке после зарплаты 😅" : `${cartCount} товар(а) на сумму ${cartTotal} ₽`}
          </p>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 animate-bounce-slow">🛒</div>
              <p className="text-gray-400 text-xl mb-6">Корзина грустит без товаров...</p>
              <button onClick={() => setActiveSection("catalog")} className="bg-sambery-orange text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform">
                Идти в каталог!
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cart.map(item => {
                  const p = PRODUCTS.find(p => p.id === item.id)!;
                  return (
                    <div key={item.id} className="bg-white border-2 border-orange-100 rounded-2xl p-4 flex items-center gap-4 card-hover">
                      <span className="text-4xl">{p.emoji}</span>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">{p.name}</div>
                        <div className="text-sambery-orange font-bold">{p.price} ₽</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => removeFromCart(p.id)} className="w-8 h-8 bg-orange-100 text-sambery-orange rounded-full font-bold hover:bg-sambery-orange hover:text-white transition-colors flex items-center justify-center">
                          <Icon name="Minus" size={16} />
                        </button>
                        <span className="font-bold text-lg w-6 text-center">{item.qty}</span>
                        <button onClick={() => addToCart(p.id)} className="w-8 h-8 bg-orange-100 text-sambery-orange rounded-full font-bold hover:bg-sambery-orange hover:text-white transition-colors flex items-center justify-center">
                          <Icon name="Plus" size={16} />
                        </button>
                      </div>
                      <div className="font-bold text-gray-800 w-20 text-right">{p.price * item.qty} ₽</div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-sambery-orange rounded-3xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-semibold">Товаров:</span>
                  <span className="font-bold">{cartCount} шт.</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 font-semibold text-lg">Итого:</span>
                  <span className="font-pacifico text-3xl text-sambery-orange">{cartTotal} ₽</span>
                </div>
                <button className="w-full bg-sambery-orange text-white py-4 rounded-2xl font-bold text-xl hover:scale-[1.02] hover:shadow-xl transition-all">
                  🎉 Оформить заказ
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">Бесплатная доставка от 1500 ₽ 🚚</p>
              </div>
            </>
          )}
        </section>
      )}

      {/* ===== АКЦИИ ===== */}
      {activeSection === "specials" && (
        <section className="py-12 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-sambery-red text-white font-pacifico text-lg px-6 py-3 rounded-full mb-4 animate-price-pop">
              🔥 Горящие предложения!
            </div>
            <h2 className="font-pacifico text-5xl text-sambery-dark mb-3">Специальные предложения</h2>
            <p className="text-gray-500 text-lg">Торопись — завтра цены могут вырасти. Или нет. Но лучше сегодня! 😉</p>
          </div>

          {/* Баннер */}
          <div className="bg-gradient-to-r from-sambery-orange to-red-500 rounded-3xl p-8 mb-12 text-white relative overflow-hidden">
            <div className="absolute -right-8 -top-8 text-[150px] opacity-20">🎯</div>
            <div className="relative z-10">
              <div className="font-pacifico text-4xl mb-3">Суперакция недели!</div>
              <p className="text-xl opacity-90 mb-6">При покупке на сумму от 2000 ₽ — скидка 200 ₽ автоматически. Без кодов, без QR-кодов, без магии.</p>
              <button onClick={() => setActiveSection("catalog")} className="bg-white text-sambery-orange font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform">
                Начать покупки →
              </button>
            </div>
          </div>

          {/* Карточки акций */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {SPECIALS.map((s, i) => (
              <div key={i} className={`bg-gradient-to-br ${s.color} rounded-3xl p-6 text-white card-hover relative overflow-hidden`}>
                <div className="absolute -right-4 -bottom-4 text-[80px] opacity-20">{s.emoji}</div>
                <div className="relative z-10">
                  <div className="bg-white/30 text-white font-bold text-xs px-3 py-1 rounded-full inline-block mb-4">
                    {s.badge}
                  </div>
                  <div className="text-4xl mb-3">{s.emoji}</div>
                  <h3 className="font-pacifico text-xl mb-2">{s.title}</h3>
                  <p className="opacity-90 leading-relaxed text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Товары со скидкой */}
          <h3 className="font-pacifico text-3xl text-sambery-dark mb-6">Товары со скидкой прямо сейчас 👇</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTS.filter(p => p.discount > 0).map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} cartQty={cart.find(i => i.id === p.id)?.qty || 0} onRemove={removeFromCart} />
            ))}
          </div>
        </section>
      )}

      {/* ===== ДОСТАВКА ===== */}
      {activeSection === "delivery" && (
        <section className="py-12 max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-pacifico text-5xl text-sambery-dark mb-3">Доставка и оплата 🚚</h2>
            <p className="text-gray-500 text-lg">Везём быстро, аккуратно и с улыбкой!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { emoji: "⚡", title: "Экспресс-доставка", price: "199 ₽", time: "1–2 часа", desc: "Для тех, кто хочет всё и сразу. Курьер приедет быстрее, чем вы успеете передумать.", color: "border-sambery-orange bg-orange-50" },
              { emoji: "🌙", title: "Вечерняя доставка", price: "149 ₽", time: "до 21:00", desc: "Заказывай днём — получай вечером. Идеально для планировщиков. Или для ленивых.", color: "border-purple-300 bg-purple-50" },
              { emoji: "📅", title: "Доставка ко времени", price: "99 ₽", time: "по расписанию", desc: "Выбери удобное время с точностью до часа. Мы не опоздаем. Честное слово.", color: "border-green-300 bg-green-50" },
              { emoji: "🎁", title: "Бесплатная доставка", price: "0 ₽", time: "при заказе от 1500 ₽", desc: "Наберёшь на 1500 — везём бесплатно. Математика простая, выгода очевидная!", color: "border-sambery-yellow bg-yellow-50" },
            ].map(d => (
              <div key={d.title} className={`border-2 ${d.color} rounded-3xl p-6 card-hover`}>
                <div className="text-4xl mb-3">{d.emoji}</div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-pacifico text-xl text-gray-800">{d.title}</h3>
                  <span className="font-pacifico text-xl text-sambery-orange">{d.price}</span>
                </div>
                <div className="text-xs font-bold text-gray-500 mb-3">⏱ {d.time}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-sambery-dark text-white rounded-3xl p-8">
            <h3 className="font-pacifico text-3xl text-sambery-yellow mb-6">Способы оплаты 💳</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { emoji: "💳", label: "Банковской картой" },
                { emoji: "📱", label: "СБП / QR-код" },
                { emoji: "💵", label: "Наличными курьеру" },
                { emoji: "🎁", label: "Баллами карты" },
              ].map(m => (
                <div key={m.label} className="bg-white/10 rounded-2xl p-4 text-center">
                  <div className="text-3xl mb-2">{m.emoji}</div>
                  <div className="text-sm font-semibold text-orange-100">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== КОНТАКТЫ ===== */}
      {activeSection === "contacts" && (
        <section className="py-12 max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-pacifico text-5xl text-sambery-dark mb-3">Контакты 📞</h2>
            <p className="text-gray-500 text-lg">Мы рады каждому звонку! (Ну, почти каждому 😄)</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-sambery-orange rounded-3xl p-8">
              <h3 className="font-pacifico text-2xl text-sambery-dark mb-6">🗺 Наши магазины</h3>
              {[
                { addr: "ул. Ленина, 42 — «Главный»", time: "08:00 – 23:00" },
                { addr: "пр. Мира, 15 — «Северный»", time: "09:00 – 22:00" },
                { addr: "ул. Садовая, 7 — «Маленький»", time: "07:00 – 23:00" },
              ].map(s => (
                <div key={s.addr} className="flex items-start gap-3 mb-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">{s.addr}</div>
                    <div className="text-xs text-gray-500">⏰ {s.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {[
                { emoji: "📞", label: "Телефон", value: "+7 (964) 433-56-68", sub: "Звоните в любое время" },
                { emoji: "📧", label: "Email", value: "kostazadanov@gmail.com", sub: "Ответим в течение часа" },
                { emoji: "💬", label: "Telegram", value: "@sambery_official", sub: "Для быстрых вопросов" },
                { emoji: "📸", label: "Instagram*", value: "@sambery_market", sub: "Фото, акции, жизнь" },
              ].map(c => (
                <div key={c.label} className="bg-white border-2 border-gray-100 rounded-2xl p-5 flex items-center gap-4 card-hover hover:border-sambery-orange transition-colors">
                  <span className="text-3xl">{c.emoji}</span>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold">{c.label}</div>
                    <div className="font-bold text-gray-800">{c.value}</div>
                    <div className="text-xs text-gray-500">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Форма обратной связи */}
          <div className="bg-sambery-dark text-white rounded-3xl p-8">
            <h3 className="font-pacifico text-3xl text-sambery-yellow mb-2">Напишите нам! 💌</h3>
            <p className="text-orange-200 text-sm mb-6">Жалоба, предложение или просто поздороваться — всё принимаем!</p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input placeholder="Ваше имя 😊" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-sambery-yellow" />
              <input placeholder="Email или телефон" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-sambery-yellow" />
            </div>
            <textarea placeholder="Ваше сообщение... 📝" rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-sambery-yellow mb-4 resize-none" />
            <button className="bg-sambery-yellow text-sambery-dark font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform">
              Отправить! 🚀
            </button>
          </div>
        </section>
      )}

      {/* ФУТЕР */}
      <footer className="bg-sambery-dark text-white mt-16 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="font-pacifico text-3xl text-sambery-orange mb-3">🛒 Самбери</div>
          <p className="text-orange-200 text-sm mb-6">Самый весёлый супермаркет в твоём городе</p>
          <div className="flex justify-center gap-6 flex-wrap text-sm text-orange-300">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveSection(item.id)} className="hover:text-white transition-colors">
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-8 text-xs text-white/30">
            © 2024 Самбери. Все права защищены. Цены действительны до следующего настроения директора.
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product, onAdd, cartQty, onRemove }: {
  product: typeof PRODUCTS[0];
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  cartQty: number;
}) {
  return (
    <div className="bg-white border-2 border-orange-100 rounded-2xl p-4 flex flex-col card-hover cursor-default relative overflow-hidden">
      {product.tag && (
        <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full animate-price-pop ${
          product.discount > 0 ? "bg-sambery-red text-white" : "bg-sambery-yellow text-sambery-dark"
        }`}>
          {product.tag}
        </div>
      )}
      <div className="text-5xl text-center my-3">{product.emoji}</div>
      <h4 className="font-bold text-gray-800 text-sm mb-2 leading-snug">{product.name}</h4>
      <div className="mt-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-pacifico text-xl text-sambery-orange">{product.price} ₽</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">{product.oldPrice} ₽</span>
          )}
        </div>
        {cartQty === 0 ? (
          <button
            onClick={() => onAdd(product.id)}
            className="w-full bg-sambery-orange text-white py-2 rounded-xl font-bold text-sm hover:bg-orange-600 hover:scale-[1.02] transition-all"
          >
            В корзину
          </button>
        ) : (
          <div className="flex items-center justify-between bg-orange-50 rounded-xl px-2 py-1">
            <button onClick={() => onRemove(product.id)} className="w-8 h-8 flex items-center justify-center text-sambery-orange font-bold hover:bg-sambery-orange hover:text-white rounded-lg transition-colors">
              <Icon name="Minus" size={16} />
            </button>
            <span className="font-bold text-sambery-orange">{cartQty}</span>
            <button onClick={() => onAdd(product.id)} className="w-8 h-8 flex items-center justify-center text-sambery-orange font-bold hover:bg-sambery-orange hover:text-white rounded-lg transition-colors">
              <Icon name="Plus" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}