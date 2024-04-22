// --- ENDPOINT ---
const API_ENDPOINT = "https://v1.appbackend.io/v1/rows/768NKI6qq7pq";
const notesContainer = document.getElementById("noteCard");
const searchInput = document.getElementById("searchInput");
const form = document.getElementById("form");

// // --- FILTERED ----
// let dataNotes = [];

// searchInput.addEventListener("keyup", () => {
//   const searchValue = searchInput.value;
//   notesContainer.innerHTML = "";

//   const filteredNotes = dataNotes.filter((note) =>
//     note.title.toLowerCase().includes(searchValue.toLowerCase())
//   );

//   // GET DATA
//   filteredNotes.forEach((note) => {
//     const newNoteElement = document.createElement("div");
//     const newNoteTitleElement = document.createElement("h3");
//     const newNoteContentElement = document.createElement("p");
//     const newNoteDateElement = document.createElement("p");
//     const newNoteBtn = document.createElement("a");

//     newNoteTitleElement.textContent = note.title;
//     newNoteContentElement.textContent = note.content;
//     newNoteDateElement.textContent = note.date;
//     newNoteBtn.textContent = "See note";
//     newNoteBtn.href = `note.html?id=${note._id}`;

//     newNoteTitleElement.classList.add("text-xl", "font-bold");
//     newNoteContentElement.classList.add("text-blue-300");
//     newNoteDateElement.classList.add("text-red-300");
//     newNoteBtn.classList.add(
//       "bg-indigo-500",
//       "text-white",
//       "p-2",
//       "rounded-lg",
//       "w-[10px]"
//     );
//     newNoteElement.classList.add(
//       "border",
//       "border-gray-100",
//       "p-2",
//       "bg-blue-100",
//       "shadow-md",
//       "rounded-md",
//       "shadow-black/5",
//       "grid",
//       "grid-cols-1"

//       // bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5
//       // "divide-y",
//       // "divide-gray-400"
//     );

//     newNoteElement.append(
//       newNoteTitleElement,
//       newNoteContentElement,
//       newNoteDateElement,
//       newNoteBtn
//     );
//     notesContainer.append(newNoteElement);
//     console.log(notesContainer);
//   });
// });

form.addEventListener("submit", async (event) => {
  // avoid default behavior
  event.preventDefault();

  //Convention
  // targetkan ke form, ambil semua elemen dalam form
  const formData = new FormData(event.target);

  // ambil data
  const title = formData.get("title");
  const content = formData.get("content");
  const date = formData.get("date");

  await createData(title, content, date);
  location.reload();
});

async function createData(title, content, date) {
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ title, content, date }]),
  });
  const data = await res.json();
  return data;
}

async function deleteNote(id) {
  await fetch(API_ENDPOINT, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([id]),
  });
  location.reload();
}

// --- SHOW ALL DATA ----
async function getAllData() {
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return data;
}

async function buildApp() {
  const notes = await getAllData();

  notes.data.forEach((note) => {
    const newNoteElement = document.createElement("div");
    const newNoteTitleElement = document.createElement("h3");
    const newNoteContentElement = document.createElement("p");
    const newNoteDateElement = document.createElement("p");
    const newNoteBtn = document.createElement("a");

    newNoteTitleElement.textContent = note.title;
    newNoteContentElement.textContent = note.content;
    newNoteDateElement.textContent = note.date;
    newNoteBtn.textContent = "See note";
    newNoteBtn.href = `note.html?id=${note._id}`;

    // EDIT
    const newNoteEdit = document.createElement("a");
    newNoteEdit.href = `editNote.html?id=${note._id}`;
    newNoteEdit.classList.add(
      "ri-edit-2-line",
      "absolute",
      "bottom-3",
      "right-3"
    );

    // DELETE
    const newNoteDelete = document.createElement("button");
    newNoteDelete.classList.add(
      "ri-delete-bin-line",
      "absolute",
      "top-3",
      "right-3"
    );
    newNoteDelete.addEventListener("click", async () => {
      await deleteNote(note._id);
    });

    newNoteTitleElement.classList.add("text-xl", "font-bold", "text-red-600");
    newNoteContentElement.classList.add("text-slate-800");
    newNoteDateElement.classList.add("text-gray-500", "text-sm", "mt-4");
    newNoteBtn.classList.add(
      "bg-yellow-200",
      "text-slate-800",
      "p-1",
      "rounded-lg",
      "w-[100px]",
      "text-center",
      "mt-2",
      "shadow-md"
    );

    newNoteElement.classList.add(
      "border",
      "border-gray-100",
      "p-4",
      "bg-white",
      "shadow-md",
      "rounded-md",
      "shadow-black/20",
      "grid",
      "grid-cols-1",
      "relative"
    );

    newNoteElement.append(
      newNoteTitleElement,
      newNoteContentElement,
      newNoteDateElement,
      newNoteBtn,
      newNoteEdit,
      newNoteDelete
    );
    notesContainer.append(newNoteElement);
  });
}

buildApp();
