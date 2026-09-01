document.addEventListener("DOMContentLoaded", function () {

```
// Get elements from HTML
const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const shoppingList = document.getElementById("shoppingList");
const clearBtn = document.getElementById("clearBtn");
const itemCount = document.getElementById("itemCount");
const emptyMessage = document.getElementById("emptyMessage");

// Shopping list array
let items = [];


// =========================
// ADD ITEM
// =========================

function addItem() {

    const itemName = itemInput.value.trim();

    if (itemName === "") {
        alert("Please enter an item.");
        return;
    }

    const newItem = {
        id: Date.now(),
        name: itemName,
        completed: false
    };

    items.push(newItem);

    itemInput.value = "";

    displayItems();

    itemInput.focus();
}


// =========================
// DISPLAY ITEMS
// =========================

function displayItems() {

    shoppingList.innerHTML = "";

    if (items.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }


    items.forEach(function (item) {

        // Create list item
        const li = document.createElement("li");

        li.classList.add("shopping-item");


        // Create item text
        const span = document.createElement("span");

        span.classList.add("item-text");

        span.textContent = item.name;


        // Mark as completed
        if (item.completed) {
            li.classList.add("completed");
        }


        // Create button container
        const buttonContainer = document.createElement("div");

        buttonContainer.classList.add("item-buttons");


        // =========================
        // COMPLETE BUTTON
        // =========================

        const completeBtn = document.createElement("button");

        completeBtn.textContent = item.completed ? "↩️" : "✅";


        completeBtn.addEventListener("click", function () {

            item.completed = !item.completed;

            displayItems();

        });


        // =========================
        // EDIT BUTTON
        // =========================

        const editBtn = document.createElement("button");

        editBtn.textContent = "✏️";

        editBtn.classList.add("edit-btn");


        editBtn.addEventListener("click", function () {

            const newName = prompt(
                "Enter the new item name:",
                item.name
            );


            if (newName !== null && newName.trim() !== "") {

                item.name = newName.trim();

                displayItems();

            }

        });


        // =========================
        // DELETE BUTTON
        // =========================

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "🗑️";

        deleteBtn.classList.add("delete-btn");


        deleteBtn.addEventListener("click", function () {

            items = items.filter(function (currentItem) {

                return currentItem.id !== item.id;

            });

            displayItems();

        });


        // Add buttons to button container
        buttonContainer.appendChild(completeBtn);

        buttonContainer.appendChild(editBtn);

        buttonContainer.appendChild(deleteBtn);


        // Add text and buttons to list item
        li.appendChild(span);

        li.appendChild(buttonContainer);


        // Add list item to shopping list
        shoppingList.appendChild(li);

    });


    updateItemCount();

}


// =========================
// UPDATE ITEM COUNT
// =========================

function updateItemCount() {

    const totalItems = items.length;


    const purchasedItems = items.filter(function (item) {

        return item.completed;

    }).length;


    if (totalItems === 0) {

        itemCount.textContent = "0 items";

    } else if (totalItems === 1) {

        itemCount.textContent =
            "1 item • " + purchasedItems + " purchased";

    } else {

        itemCount.textContent =
            totalItems + " items • " +
            purchasedItems + " purchased";

    }

}


// =========================
// CLEAR ALL
// =========================

clearBtn.addEventListener("click", function () {

    if (items.length === 0) {

        alert("Your shopping list is already empty.");

        return;

    }


    const confirmClear = confirm(
        "Are you sure you want to clear all items?"
    );


    if (confirmClear) {

        items = [];

        displayItems();

    }

});


// =========================
// ADD BUTTON
// =========================

addBtn.addEventListener("click", addItem);


// =========================
// ENTER KEY
// =========================

itemInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addItem();

    }

});


// =========================
// INITIAL DISPLAY
// =========================

displayItems();
```

});
