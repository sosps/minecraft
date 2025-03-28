function showBlockImage() {
    let blockName = document.getElementById("blockName").value.toLowerCase().replace(/ /g, "_");
    let img = document.getElementById("blockImage");

    let pngPath = `images/${blockName}.png`;
    let webpPath = `images/${blockName}.webp`;

    fetch(pngPath)
        .then(response => {
            if (response.ok) {
                img.src = pngPath;
                img.style.display = "block";
            } else {
                return fetch(webpPath);
            }
        })
        .then(response => {
            if (response && response.ok) {
                img.src = webpPath;
                img.style.display = "block";
            } else {
                img.style.display = "none";
                alert("Image not found! Did you spell it right?");
            }
        })
        .catch(error => console.error("Error loading images:", error));
}


function calculateStacks() {
    let blockName = document.getElementById("blockName").value.toLowerCase().replace(/ /g, "_");
    let amount = parseInt(document.getElementById("itemCount").value);
    let resultDiv = document.getElementById("result");

    if (!resultDiv) {
        console.error("Div 'result' not found!");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerHTML = "<p style='color: red;'>Insert a valid number!</p>";
        return;
    }

    let maxStackSize = 64;
    if (["snowball", "egg", "oak_sign", "spruce_sign", "birch_sign", "jungle_sign", "acacia_sign", "dark_oak_sign", "mangrove_sign", "cherry_sign", "pale_oak_sign", "bamboo_sign", "crimson_sign", "warped_sign", "oak_hanging_sign", "spruce_hanging_sign", "birch_hanging_sign", "jungle_hanging_sign", "acacia_hanging_sign", "dark_oak_hanging_sign", "mangrove_hanging_sign", "cherry_hanging_sign", "pale_oak_hanging_sign", "bamboo_hanging_sign", "crimson_hanging_sign", "warped_hanging_sign", "black_banner", "gray_banner", "light_gray_banner", "white_banner", "light_blue_banner", "orange_banner", "red_banner", "blue_banner", "purple_banner", "magenta_banner", "pink_banner", "brown_banner", "yellow_banner", "lime_banner", "green_banner", "cyan_banner", "ominous_banner", "armor_stand", "scaffolding", "bucket"].includes(blockName)) maxStackSize = 16;

    let stacks = Math.floor(amount / maxStackSize);
    let remaining = amount % maxStackSize;

    resultDiv.innerHTML = `
    <div class="result-container">
        <p>${stacks} stack e ${remaining} item</p>
        <img src="images/${blockName}.webp" class="result-img" onerror="this.style.display='none'">
    </div>
`;
}

const blockList = [
    "acacia_button", "acacia_door", "acacia_fence", "acacia_fence_gate", "acacia_hanging_sign", "acacia_leaves", "acacia_log", "acacia_planks", "acacia_pressure_plate", "acacia_sapling", "acacia_sign", "acacia_slab", "acacia_stairs", "acacia_trapdoor", "acacia_wood", "activator_rail", "allium", "amethyst_cluster", "ancient_debris", "andesite", "andesite_slab", "andesite_stairs", "andesite_wall", "anvil", "azalea", "azalea_leaves", "azure_bluet", "bamboo", "bamboo_button", "bamboo_door", "bamboo_fence", "bamboo_fence_gate", "bamboo_hanging_sign", "bamboo_mosaic", "bamboo_mosaic_slab", "bamboo_mosaic_stairs", "bamboo_planks", "bamboo_pressure_plate", "bamboo_sign", "bamboo_sign", "bamboo_slab", "bamboo_stairs", "bamboo_trapdoor", "barrel", "basalt", "beacon", "bee nest", "beehive", "beetroots", "bell", "big dripleaf", "birch_button", "birch_door", "birch_fence", "birch_fence_gate", "birch_hanging_sign", "birch_leaves", "birch_log", "birch_planks", "birch_pressure_plate", "birch_sapling", "birch_sign", "birch_slab", "birch_stairs", "birch_trapdoor", "birch_wood", "black_banner", "black_bed", "black_candle", "black_carpet", "black_concrete", "black_concrete_powder", "black_glazed_terracotta", "black_shulker_box", "black_stained_glass", "black_stained_glass_pane", "black_terracotta", "black_wood", "blackstone", "blackstone_slab", "blackstone_stairs", "blackstone_wall"
];

function showSuggestions() {
    let input = document.getElementById("blockName");
    let suggestionsDiv = document.getElementById("suggestions");

    suggestionsDiv.innerHTML = ""; 
    if (input.value.length < 1) return;

    let filteredBlocks = blockList.filter(block => block.includes(input.value.toLowerCase()));

    let inputRect = input.getBoundingClientRect();

    suggestionsDiv.style.position = "absolute";
    suggestionsDiv.style.left = `${inputRect.left + window.scrollX}px`;
    suggestionsDiv.style.top = `${inputRect.bottom + window.scrollY}px`;
    suggestionsDiv.style.width = `${inputRect.width}px`;
    suggestionsDiv.style.background = "white";
    suggestionsDiv.style.border = "1px solid gray";
    suggestionsDiv.style.zIndex = "1000";

    filteredBlocks.forEach(block => {
        let div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.innerHTML = `<img src="images/${block}.webp" class="suggestion-img" onerror="this.style.display='none'"> ${block}`;
        div.onclick = () => {
            input.value = block;
            suggestionsDiv.innerHTML = ""; 
        };
        suggestionsDiv.appendChild(div);
    });

    suggestionsDiv.style.display = filteredBlocks.length > 0 ? "block" : "none";
}