// Dữ liệu người chơi mẫu (Database) - DỮ LIỆU SẼ MẤT KHI RELOAD TRANG
let players = [
    {
        id: 1,
        name: "nhyoopyy",
        profileLink: "https://www.roblox.com/vi/users/3557373065/profile",
        avatarLink: "https://cdn.discordapp.com/attachments/1473278836987924480/1482265107781259356/IMG_0282.png?ex=69cac1b4&is=69c97034&hm=d26425012d54c3cbc0ea5f945304843bf99e270adeb899862a16341cfe524867&",
        unit: "Không có",
        jobTitle: "Bí Thư Quân Uỷ Trung Ương",
        rank: "Không có"
    },
    {
        id: 2,
        name: "Toandz999998",
        profileLink: "https://www.roblox.com/vi/users/6020523570/profile",
        avatarLink: "https://cdn.discordapp.com/attachments/1487818608766619850/1488029638729924698/IMG_0520.png?ex=69cb4b18&is=69c9f998&hm=d4bc5acb63d3236d6ba2360d8dc3cf529bbafe94db0ed1868dcd8092ea549321&",
        unit: "Không có",
        jobTitle: "Tổng Bí Thư",
        rank: "Không có"
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
    alert("Chức năng này chỉ dành cho Admin web.");
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
