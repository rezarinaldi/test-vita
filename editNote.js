const query = location.search;
const params = new URLSearchParams(query);
const id = params.get("id");

const API_ENDPOINT = `https://v1.appbackend.io/v1/rows/768NKI6qq7pq/${id}`;

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const dateInput = document.getElementById("date");
const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch("https://v1.appbackend.io/v1/rows/768NKI6qq7pq", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: id,
      title: titleInput.value,
      content: contentInput.value,
      date: dateInput.value,
    }),
  });

  location.replace(`/note.html?id=${id}`);
});

async function getNote() {
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return data;
}

async function buildApp() {
  const note = await getNote();

  titleInput.value = note.title;
  contentInput.value = note.content;
  dateInput.value = note.date;
}

buildApp();
