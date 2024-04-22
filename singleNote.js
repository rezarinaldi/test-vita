const noteContainer = document.getElementById("single-note");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

const query = location.search;
const params = new URLSearchParams(query);
const id = params.get("id");

const API_ENDPOINT = `https://v1.appbackend.io/v1/rows/768NKI6qq7pq/${id}`;

editBtn.href = `editNote.html?id=${note._id}`;
deleteBtn.addEventListener("click", async () => {
  await deleteNote(note._id);
});

async function getNote() {
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return data;
}

async function buildApp() {
  const note = await getNote();
  const noteCard = document.createElement("div");
  const title = document.createElement("h2");
  const content = document.createElement("p");
  const date = document.createElement("p");

  title.textContent = note.title;
  content.textContent = note.content;
  date.textContent = note.date;

  title.classList.add("text-4xl", "font-bold", "mt-5");
  content.classList.add(
    "whitespace-pre-line",
    "hover:leading-loose",
    "leading-none",
    "mt-3"
  );
  date.classList.add(
    "whitespace-pre-line",
    "text-slate-500",
    "absolute",
    "mt-6",
    "right-3",
    "bottom-0"
  );
  noteContainer.append(title, content, date);
}

buildApp();
