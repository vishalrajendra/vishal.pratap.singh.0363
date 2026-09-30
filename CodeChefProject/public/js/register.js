const eventId = new URLSearchParams(location.search).get("event");
const form = document.getElementById("registrationForm");

async function loadEvent() {
  if (!eventId) { document.getElementById("error").textContent = "No event selected."; document.getElementById("error").style.display="block"; return; }
  const res = await fetch("/api/events/" + eventId);
  const data = await res.json();
  if (!data.success) { showError(data.message); return; }
  document.getElementById("eventTitle").textContent = "Register: " + data.event.name;
  document.getElementById("eventInfo").textContent = `${data.event.date} • ${data.event.time} • ${data.event.venue}`;
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(form));
  payload.eventId = eventId;
  const res = await fetch("/api/registrations", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)});
  const data = await res.json();
  if (data.success) {
    document.getElementById("success").textContent = "Registration successful! See you at the event.";
    document.getElementById("success").style.display = "block";
    document.getElementById("error").style.display = "none";
    form.reset();
  } else showError(data.message);
});
function showError(msg){document.getElementById("error").textContent=msg;document.getElementById("error").style.display="block";}
loadEvent();