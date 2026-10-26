const official = {
  home: "https://www.bb.org.bd/",
  monetary: "https://www.bb.org.bd/",
  financial: "https://www.bb.org.bd/en/index.php/financialactivity",
  fx: "https://www.bb.org.bd/en/index.php/econdata/exchangerate",
  publication: "https://www.bb.org.bd/",
  payment: "https://www.bb.org.bd/en/index.php/financialactivity/paymentsystem",
  saarcf: "https://www.saarcfinance.org/"
};

// Navigation buttons intentionally do not open dropdowns or change the page.
document.querySelectorAll(".nav button, .mobile-nav button").forEach(button => {
  button.addEventListener("click", event => event.preventDefault());
});

const menuBtn = document.querySelector("#menuBtn");
const mobileNav = document.querySelector("#mobileNav");
menuBtn.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", String(open));
});

const slideFiles = [
  "asstes/1.png",
  "asstes/2.jpg",
  "asstes/3.jpg",
  "asstes/4.jpg",
  "asstes/5.jpg"
];
const slidesBox = document.querySelector("#slides");
const dotsBox = document.querySelector("#dots");
let currentSlide = 0;
let timer;

slideFiles.forEach((src, index) => {
  const slide = document.createElement("div");
  slide.className = "slide";
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Bangladesh Bank banner ${index + 1}`;
  img.loading = index ? "lazy" : "eager";
  img.onerror = () => {
    slide.innerHTML = '<div class="slide-fallback"><strong>Bangladesh Bank</strong><span>Central Bank of Bangladesh</span></div>';
  };
  slide.appendChild(img);
  slidesBox.appendChild(slide);

  const dot = document.createElement("button");
  dot.className = "dot" + (index === 0 ? " active" : "");
  dot.type = "button";
  dot.setAttribute("aria-label", `Show slide ${index + 1}`);
  dot.addEventListener("click", () => { currentSlide = index; updateSlider(); restartSlider(); });
  dotsBox.appendChild(dot);
});

function updateSlider() {
  slidesBox.style.transform = `translateX(-${currentSlide * 100}%)`;
  dotsBox.querySelectorAll(".dot").forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
}
function nextSlide() { currentSlide = (currentSlide + 1) % slideFiles.length; updateSlider(); }
function previousSlide() { currentSlide = (currentSlide - 1 + slideFiles.length) % slideFiles.length; updateSlider(); }
function restartSlider() { clearInterval(timer); timer = setInterval(nextSlide, 5000); }
document.querySelector("#nextBtn").addEventListener("click", () => { nextSlide(); restartSlider(); });
document.querySelector("#prevBtn").addEventListener("click", () => { previousSlide(); restartSlider(); });
document.querySelector(".slider").addEventListener("mouseenter", () => clearInterval(timer));
document.querySelector(".slider").addEventListener("mouseleave", restartSlider);
document.querySelector(".slider").addEventListener("focusin", () => clearInterval(timer));
document.querySelector(".slider").addEventListener("focusout", restartSlider);

const newsItems = [
  { title: "Bangladesh Bank — Official Website", url: official.home },
  { title: "Exchange Rates | Bangladesh Bank", url: official.fx },
  { title: "Payment Systems | Bangladesh Bank", url: official.payment }
];
let newsIndex = 0;
function renderNews() {
  const container = document.querySelector("#news");
  container.replaceChildren();
  const link = document.createElement("a");
  link.href = newsItems[newsIndex].url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = newsItems[newsIndex].title;
  container.appendChild(link);
}
document.querySelector("#newsPrev").addEventListener("click", () => {
  newsIndex = (newsIndex - 1 + newsItems.length) % newsItems.length; renderNews();
});
document.querySelector("#newsNext").addEventListener("click", () => {
  newsIndex = (newsIndex + 1) % newsItems.length; renderNews();
});

const cardData = [
  ["MONETARY POLICY","▧",["MPS / Monetary Policy Statements","MPC Resolution","Repo Information","BB Bill Auction"],official.monetary],
  ["MEDIA & PRESS RELEASE","♧",["Circulars / Circular Letters","Press Release","Regulations and Guidelines","Procurements"],official.publication],
  ["INVESTMENT FACILITY","⌁",["Facilities / Incentives","Inward Remittance Facilities","NRB Bond","Prizebond / Sanchayapatra"],official.home],
  ["ECONOMIC DATA","▰",["Wage Earner's Remittance Inflow","BOP, Export and Import","Economic Data","Recent Upload"],official.home],
  ["G-SEC MARKET","⌁",["Government Securities Market","Treasury Bill and Bond Auction","G-Sec OMS","Government Investment Sukuk"],official.home],
  ["FX MARKET","⇄",["Interbank FX Market","Exchange Rates / FX Reference Rate","FX Auction Result","Foreign Exchange Reserve"],official.fx],
  ["LINKS","⌘",["BFIU Website","BBTA Webportal","SME Portal","E-Tender / E-Recruitment"],official.home],
  ["PAYMENT SYSTEMS","▱",["Bangladesh Payment Systems Report","Payment Platforms","Trend Analysis","National Payment Data"],official.payment],
  ["INNOVATION CORNER","♧",["Innovation Team","Innovation Action Plan","Innovation Guidelines","Progress Report"],official.home],
  ["FINANCIAL STABILITY","▥",["Financial Stability Committee","Macroprudential Supervision","Guidelines, Circulars and Reports"],official.financial],
  ["NATIONAL INTEGRITY STRATEGY","›",["Ethics Committee","Implementation Plan","Integrity Award","Others"],official.home],
  ["NATIONAL ICT POLICY","▣",["National ICT Policy","ICT Focal Point","Implementation Committee"],official.home],
  ["SERVICES","♙",["E-Services","Customer Complaints","BB Forms","Claim Your Money"],official.home],
  ["RECENT UPLOAD","♧",["News Clips","Foreign Visit / Passport / NOC","Notice Board / Meeting Minutes","Banknotes and Coins"],official.publication]
];
const cardsBox = document.querySelector("#cards");
function renderCards(filter = "") {
  cardsBox.replaceChildren();
  const query = filter.trim().toLowerCase();
  const filtered = cardData.filter(([title,,links]) => !query || title.toLowerCase().includes(query) || links.some(x => x.toLowerCase().includes(query)));
  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "no-results";
    empty.textContent = "No matching sections found.";
    cardsBox.appendChild(empty);
    return;
  }
  filtered.forEach(([title, icon, links, url], i) => {
    const card = document.createElement("article");
    card.className = "card";
    const heading = document.createElement("h3");
    heading.textContent = title;
    const iconBox = document.createElement("div");
    iconBox.className = "card-icon";
    iconBox.textContent = icon;
    const list = document.createElement("ul");
    links.forEach(label => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = label;
      li.appendChild(a);
      list.appendChild(li);
    });
    card.append(heading, iconBox, list);
    cardsBox.appendChild(card);
  });
}
document.querySelector("#searchForm").addEventListener("submit", event => {
  event.preventDefault();
  renderCards(document.querySelector("#searchInput").value);
  document.querySelector("#cards").scrollIntoView({behavior:"smooth", block:"start"});
});
document.querySelector("#searchInput").addEventListener("input", event => renderCards(event.target.value));

renderNews();
renderCards();
updateSlider();
restartSlider();
