const API_URL = "https://api4.binance.com/api/v3/ticker/24hr";
const coinList = document.getElementById("coin-list");
// tbody에 붙인 id로 요소 찾아오기
const searchInput = document.getElementById("search");
const tabAll = document.getElementById("tab-all");
const tabFav = document.getElementById("tab-fav");

let coins =[];
// 받아온 USDT 데이터를 저장해두는 전역 변수(어디에든 사용 가능)
// 값이 계속 변하니까 const가 아니라 let
let isLoading = false;
let searchKeyword = "";
let currentTab = "all";    // 지금 보고 있는 탭을 기억하는 변수
const FAV_KEY = "favorites";
let favorites = loadFavorites();

async function fetchCoins() {
    if (isLoading) return;
    isLoading = true;
    
    // 서버가 응답을 못 줄때를 대비(와이파이가 끊기거나 기타 등등)
    try {
        const response = await fetch(API_URL);
        // fetch(URL) = 위 주소로 GET 요청을 보내는 함수
        // await는 fastapi에서 비동기 배운김에 넣어봄..
        const data = await response.json();
        // response.json() = 서버가 보낸 글자 덩어리를 JS에서 쓸 수 있는 배열∙객체로 바꿔줌

        coins = data.filter((coin) => coin.symbol.endsWith("USDT"));
        // 배열을 하나씩 돌면서 괄호 안 조건이 참인 항목만 모아서 새 배열 생성(원래 데이터는 남아있음!)
        // 화살표 함수로 배열의 항목 하나하나가 coin이라는 이름으로 들어옴
        render(getFilteredCoins());
    } catch (error) {
        console.error("데이터를 불러오지 못했습니다:", error);
    } finally {
        isLoading = false;
    }
}

// 가격의 가시성을 높이는 함수
function formatPrice(value) {
    // 문자열로 들어오는 가격을 숫자로 변환 -> 쓸모없은 0 삭제 가능, toLocalString = 천 단위 쉼표
    return Number(value).toLocaleString("en-US", {
        maximumFractionDigits: 8,
        // 너무 작은 숫자(0.000000321)가 0으로 표시되지 않도록
    });
}

//
function loadFavorites() {
    try {
        return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {
        return [];
    }
}

//
function saveFavorites() {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
}

//
function toggleFavorites(symbol) {
    if (favorites.includes(symbol)) {
        favorites = favorites.filter((fav) => fav != symbol);
    } else {
        favorites.push(symbol);
    }
    saveFavorites();
    render(getFilteredCoins());
}

//
function changeTab(tab) {
    currentTab = tab;
    tabAll.classList.toggle("active", tab === "all");
    tabFav.classList.toggle("active", tab === "fav");
    render(getFilteredCoins());
}

// 심볼에 검색어가 포함된 코인만 남기기
function getFilteredCoins() {
    let list = coins;

    if (currentTab === "fav") {
        list = list.filter((coin) => favorites.includes(coin.symbol));
    }

    return list.filter((coin) => coin.symbol.includes(searchKeyword));
}

// 배열을 받아 표를 그리는 함수
function render(list) {
    coinList.innerHTML = list
        // map으로 코인 하나당 <tr> 한 줄짜리 문자열 생성하고 join("")으로 전부 이어붙임
        // .innerHTML으로 tbody에 한 번에 넣기
        .map((coin) => {
            const percent = Number(coin.priceChangePercent);
            const colorClass = percent >= 0 ? "up" : "down";
            const sign = percent > 0 ? "+" : "";
            const isFav = favorites.includes(coin.symbol);
            
            // python의 f-srting처럼 변수값이 ${} 안에 바로 들어감
            // toFixed(2)는 소수점 둘째 자리까지 맞추고 sign(+/-)과 colorClass(up/down)
            return `
                <tr>
                    <td class="star ${isFav ? "active" : ""}" data-symbol="${coin.symbol}">
                        ${isFav ? "♥︎" : "♡"}
                    </td>
                    <td class="symbol">${coin.symbol}</td>
                    <td>${formatPrice(coin.lastPrice)}</td>
                    <td class="${colorClass}">${sign}${percent.toFixed(2)}%</td>
                    <td>${formatPrice(coin.highPrice)}</td>
                    <td>${formatPrice(coin.lowPrice)}</td>
                </tr>
            `;
        })
        .join("");
}

searchInput.addEventListener("input", () => {
    searchKeyword = searchInput.value.trim().toUpperCase();   // trim() = 공백 삭제
    render(getFilteredCoins());
});

coinList.addEventListener("pointerdown", (event) => {
    const star = event.target.closest(".star");
    if (!star) return;
    toggleFavorites(star.dataset.symbol);
});

tabAll.addEventListener("click", () => changeTab("all"));
tabFav.addEventListener("click", () => changeTab("fav"));

fetchCoins();                       // 페이지가 열자마자 바로 보이도록 처음에는 그냥 실행
setInterval(fetchCoins, 1000);      // 1000밀리초(=1초)마다 fetchCoins 실행하기