let items = [
    { id: 1, text: "2 lb apples", done: false },
    { id: 2, text: "Milk", done: false },
    { id: 3, text: "Paper towels", done: true }
  ];
  let nextId = 4;
  let filter = "all";

  const listEl = document.getElementById("list");
  const emptyEl = document.getElementById("empty-msg");
  const countEl = document.getElementById("count");
  const remainingEl = document.getElementById("remaining");
  const input = document.getElementById("item-input");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function render() {
    listEl.innerHTML = "";

    const visible = items.filter((it) => {
      if (filter === "active") return !it.done;
      if (filter === "done") return it.done;
      return true;
    });

    emptyEl.style.display = visible.length === 0 ? "block" : "none";

    visible.forEach((it) => {
      const li = document.createElement("li");
      li.className = "item" + (it.done ? " done" : "");

      const check = document.createElement("button");
      check.type = "button";
      check.className = "checkbox";
      check.setAttribute("aria-label", it.done ? "Mark as not bought" : "Mark as bought");
      check.textContent = it.done ? "✓" : "";
      check.addEventListener("click", () => {
        it.done = !it.done;
        render();
      });

      const span = document.createElement("span");
      span.className = "item-text";
      span.textContent = it.text;
      span.title = "Click to edit";
      span.addEventListener("click", () => startEdit(li, it, span));

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "remove-btn";
      delBtn.setAttribute("aria-label", "Remove item");
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", () => {
        items = items.filter((x) => x.id !== it.id);
        render();
      });

      li.appendChild(check);
      li.appendChild(span);
      li.appendChild(delBtn);
      listEl.appendChild(li);
    });

    const total = items.length;
    const doneCount = items.filter((x) => x.done).length;
    countEl.textContent = total + (total === 1 ? " item" : " items");
    remainingEl.textContent = (total - doneCount) + " left to buy";
  }

  function startEdit(li, it, span) {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = it.text;
    li.replaceChild(editInput, span);
    editInput.focus();
    editInput.select();

    function commit() {
      const val = editInput.value.trim();
      if (val) it.text = val;
      render();
    }

    editInput.addEventListener("blur", commit);
    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        commit();
      }
      if (e.key === "Escape") {
        render();
      }
    });
  }

  document.getElementById("add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    items.push({ id: nextId++, text: val, done: false });
    input.value = "";
    render();
  });

  document.getElementById("clear-done").addEventListener("click", () => {
    items = items.filter((x) => !x.done);
    render();
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
  });

  render();
