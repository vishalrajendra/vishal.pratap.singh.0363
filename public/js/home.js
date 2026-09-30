async function loadHome() {
  const res = await fetch("/api/events");
  const data = await res.json();
  const events = data.events || [];

  const upcoming = events.slice(0, 3);
  document.getElementById("upcomingEvents").innerHTML = upcoming.length
    ? upcoming.map(eventCard).join("")
    : "<p>No events available yet.</p>";

  const featured = events.find(e => e.featured) || events[0];
  document.getElementById("featuredEvent").innerHTML = featured
    ? `<div><span class="badge">Featured Event</span><h2>${escapeHtml(featured.name)}</h2>
       <p>${escapeHtml(featured.description)}</p>
       <a class="btn btn-primary" href="/register.html?event=${featured._id}">Register Now</a></div>
       <div class="featured-box"><strong>📅 ${escapeHtml(featured.date)}</strong><br>
       <strong>⏰ ${escapeHtml(featured.time)}</strong><br>
       <strong>📍 ${escapeHtml(featured.venue)}</strong><br><br>
       ${escapeHtml(featured.category)}</div>`
    : "<div><h2>No featured event</h2><p>Create an event from the admin dashboard.</p></div>";
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
loadHome();