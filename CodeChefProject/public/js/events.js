const search = document.getElementById("search");
const category = document.getElementById("category");
async function loadEvents() {
  const params = new URLSearchParams({ search: search.value, category: category.value });
  const res = await fetch("/api/events?" + params);
  const data = await res.json();
  document.getElementById("eventsGrid").innerHTML = data.events?.length
    ? data.events.map(eventCard).join("") : "<p>No matching events found.</p>";
}
function eventCard(e) {
  return `<article class="event-card"><div class="event-banner">✦</div><div class="event-body">
    <span class="category">${escapeHtml(e.category)}</span><h3>${escapeHtml(e.name)}</h3>
    <div class="event-meta"><span>📅 ${escapeHtml(e.date)}</span><span>⏰ ${escapeHtml(e.time)}</span><span>📍 ${escapeHtml(e.venue)}</span></div>
    <p class="event-desc">${escapeHtml(e.description)}</p>
    <a class="btn btn-primary" href="/register.html?event=${e._id}">Register Now</a>
  </div></article>`;
}
function escapeHtml(v){return String(v ?? "").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
search.addEventListener("input", loadEvents); category.addEventListener("change", loadEvents); loadEvents();