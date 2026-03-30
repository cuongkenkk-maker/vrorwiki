// Dữ liệu người chơi mẫu (Database) - DỮ LIỆU SẼ MẤT KHI RELOAD TRANG
let players = [
    {
        id: 1,
        name: "Kenneku (Admin)",
        profileLink: "https://game.com/kenneku",
        avatarLink: "https://via.placeholder.com/100",
        unit: "BTQUTW",
        jobTitle: "Tư lệnh",
        rank: "Đại Tướng"
    },
    {
        id: 2,
        name: "PlayerTwo",
        profileLink: "https://game.com/playertwo",
        avatarLink: "https://via.placeholder.com/100/3f51b5/ffffff",
        unit: "Hicom",
        jobTitle: "Hicom",
        rank: "Trung tướng"
    }
];

// Biến trạng thái đăng nhập
let isAdmin = false;

// Phần tử UI
const wikiList = document.getElementById("wikiList");
const addWikiBtn = document.getElementById("addWikiBtn");
const loginBtn = document.getElementById("loginBtn");

// Modals
const authModal = document.getElementById("authModal");
const addWikiModal = document.getElementById("addWikiModal");
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const playerDetailModal = document.getElementById("playerDetailModal");

// Nút đóng modal
const closeAuth = document.getElementById("closeAuth");
const closeAddWiki = document.getElementById("closeAddWiki");
const closeDelete = document.getElementById("closeDelete");
const closeDetail = document.getElementById("closeDetail");

// Biến lưu ID người chơi muốn xóa
let playerIdToDelete = null;

// Hàm mở/đóng modal
function openModal(modal) {
    modal.style.display = "block";
}

function closeModal(modal) {
    modal.style.display = "none";
}

// Logic cho Đăng nhập/Đăng ký
loginBtn.addEventListener("click", () => openModal(authModal));
closeAuth.addEventListener("click", () => closeModal(authModal));

function openTab(evt, tabName) {
    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove("active");
    }
    tabLinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Logic Đăng nhập admin
// CẢNH BÁO BẢO MẬT: THÔNG TIN NẰM TRONG CODE JavaScript
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    if (user === "kenneku" && pass === "taolaken@") {
        isAdmin = true;
        closeModal(authModal);
        loginBtn.classList.add("hidden");
        addWikiBtn.classList.remove("hidden");
        renderWikiList();
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu.");
    }
});

// Logic Đăng ký (chỉ giả định)
document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Đăng ký thành công! (Chỉ là demo, không có lưu trữ thực)");
    closeModal(authModal);
});

// Logic Thêm Wiki
addWikiBtn.addEventListener("click", () => openModal(addWikiModal));
closeAddWiki.addEventListener("click", () => closeModal(addWikiModal));
document.getElementById("cancelAddWiki").addEventListener("click", () => closeModal(addWikiModal));

document.getElementById("addWikiForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newPlayer = {
        id: players.length + 1,
        name: document.getElementById("playerName").value,
        profileLink: document.getElementById("profileLink").value,
        avatarLink: document.getElementById("avatarLink").value,
        unit: document.getElementById("unit").value,
        jobTitle: document.getElementById("jobTitle").value,
        rank: document.getElementById("rank").value
    };
    players.push(newPlayer);
    renderWikiList();
    closeModal(addWikiModal);
    document.getElementById("addWikiForm").reset();
});

// Logic Xóa người chơi
closeDelete.addEventListener("click", () => closeModal(deleteConfirmModal));
document.getElementById("cancelDelete").addEventListener("click", () => closeModal(deleteConfirmModal));

document.getElementById("confirmDelete").addEventListener("click", () => {
    if (playerIdToDelete) {
        players = players.filter(player => player.id !== playerIdToDelete);
        renderWikiList();
        closeModal(deleteConfirmModal);
        playerIdToDelete = null;
    }
});

function openDeleteModal(playerId) {
    playerIdToDelete = playerId;
    openModal(deleteConfirmModal);
}

// Logic Xem chi tiết
closeDetail.addEventListener("click", () => closeModal(playerDetailModal));

function openDetailModal(playerId) {
    const player = players.find(p => p.id === playerId);
    if (player) {
        document.getElementById("detailAvatar").src = player.avatarLink;
        document.getElementById("detailName").innerText = player.name;
        document.getElementById("detailLink").href = player.profileLink;
        document.getElementById("detailLink").innerText = "Xem trên Wiki";
        document.getElementById("detailUnit").innerText = player.unit;
        document.getElementById("detailJob").innerText = player.jobTitle;
        document.getElementById("detailRank").innerText = player.rank;
        openModal(playerDetailModal);
    }
}

// Hàm render danh sách Wiki
function renderWikiList() {
    wikiList.innerHTML = "";
    players.forEach(player => {
        const playerCard = document.createElement("div");
        playerCard.className = "player-card";
        
        playerCard.innerHTML = `
            <img src="${player.avatarLink}" alt="Avatar">
            <div class="details">
                <span class="player-name">${player.name}</span>
                <span class="view-details">Ấn vào để xem thông tin chi tiết</span>
            </div>
            ${isAdmin ? `<button class="delete">X</button>` : ""}
        `;

        // Thêm listener cho thẻ
        playerCard.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete")) {
                openDeleteModal(player.id);
            } else {
                openDetailModal(player.id);
            }
        });

        wikiList.appendChild(playerCard);
    });
}

// Khởi chạy
renderWikiList();
