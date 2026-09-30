let events = [];
let registrations = [];

async function loadEvents() {
  const res = await fetch("/api/events");
  const data = await res.json();
  events = data.events || [];
  renderEvents();
  updateStats();
  fillEventSelect();
  loadRegistrations();
}

function renderEvents() {
  const q = document.getElementById("eventSearch").value.toLowerCase();
  const cat = document.getElementById("eventCategory").value;
  const filtered = events.filter(e =>
    e.name.toLowerCase().includes(q) && (cat === "All" || e.category === cat)
  );
  document.getElementById("eventsTable").innerHTML = filtered.map(e => `
    <tr><td><strong>${esc(e.name)}</strong>${e.featured ? " ⭐" : ""}</td>
    <td>${esc(e.category)}</td><td>${esc(e.date)}</td><td>${esc(e.venue)}</td>
    <td class="actions">
      <button class="btn btn-edit" onclick="editEvent('${e._id}')">Edit</button>
      <button class="btn btn-danger" onclick="deleteEvent('${e._id}')">Delete</button>
    </td></tr>`).join("") || `<tr><td colspan="5">No events found.</td></tr>`;
}

async function loadRegistrations() {
  const search = document.getElementById("regSearch").value;
  const eventId = document.getElementById("regEvent").value;
  const params = new URLSearchParams({search, eventId});
  const res = await fetch("/api/registrations?" + params);
  const data = await res.json();
  registrations = data.registrations || [];
  document.getElementById("registrationsTable").innerHTML = registrations.map(r => `
    <tr><td>${esc(r.name)}</td><td>${esc(r.email)}</td><td>${esc(r.collegeYear)}</td>
    <td>${esc(r.phone)}</td><td>${esc(r.eventId?.name || "Deleted event")}</td></tr>
  `).join("") || `<tr><td colspan="5">No registrations found.</td></tr>`;
  document.getElementById("registrationCount").textContent = registrations.length;
}

function fillEventSelect() {
  document.getElementById("regEvent").innerHTML = `<option value="">All Events</option>` +
    events.map(e => `<option value="${e._id}">${esc(e.name)}</option>`).join("");
}

function updateStats() {
  document.getElementById("eventCount").textContent = events.length;
  document.getElementById("featuredCount").textContent = events.filter(e => e.featured).length;
}

function openEventModal(event = null) {
  document.getElementById("eventModal").classList.add("show");
  document.getElementById("modalTitle").textContent = event ? "Edit Event" : "Add Event";
  document.getElementById("eventForm").reset();
  document.getElementById("eventId").value = event?._id || "";
  if (event) {
    ["name","category","date","time","venue","description","image"].forEach(k => document.getElementById(k).value = event[k] || "");
    document.getElementById("featured").checked = !!event.featured;
  }
}
function closeEventModal(){document.getElementById("eventModal").classList.remove("show");}

function editEvent(id) {
  const event = events.find(e => e._id === id);
  if (event) openEventModal(event);
}

document.getElementById("eventForm").addEventListener("submit", async e => {
  e.preventDefault();
  const id = document.getElementById("eventId").value;
  const body = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    venue: document.getElementById("venue").value,
    description: document.getElementById("description").value,
    image: document.getElementById("image").value,
    featured: document.getElementById("featured").checked
  };
  const res = await fetch(id ? "/api/events/" + id : "/api/events", {
    method: id ? "PUT" : "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!data.success) return showMessage(data.message || "Could not save event");
  closeEventModal(); loadEvents();
});

async function deleteEvent(id) {
  if (!confirm("Delete this event and its registrations?")) return;
  const res = await fetch("/api/events/" + id, {method:"DELETE"});
  const data = await res.json();
  if (!data.success) alert(data.message);
  loadEvents();
}

function showMessage(msg){const el=document.getElementById("message");el.textContent=msg;el.style.display="block";}
function esc(v){return String(v ?? "").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

document.getElementById("eventSearch").addEventListener("input", renderEvents);
document.getElementById("eventCategory").addEventListener("change", renderEvents);
document.getElementById("regSearch").addEventListener("input", loadRegistrations);
document.getElementById("regEvent").addEventListener("change", loadRegistrations);

loadEvents();