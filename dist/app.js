'use strict';
const $ = (selector) => document.querySelector(selector);
const STORAGE_KEY = 'ruang-fokus.tasks.v1';
let tasks = [];
let filter = 'all';
let noticeTimeout;
function notify(message) { $('#notification').textContent = message; $('#notification').classList.add('visible'); clearTimeout(noticeTimeout); noticeTimeout = setTimeout(() => $('#notification').classList.remove('visible'), 3200); }
try { const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); if (Array.isArray(data)) tasks = data.filter(t => t && typeof t.id === 'string' && typeof t.title === 'string' && typeof t.done === 'boolean' && ['normal','high','low'].includes(t.priority)); } catch { notify('Data belum bisa dibaca. Kamu tetap bisa membuat tugas baru.'); }
function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch { notify('Browser tidak bisa menyimpan data. Tugas hanya tersedia selama halaman ini terbuka.'); } render(); }
function addTask(title, priority = 'normal') { if (typeof title !== 'string' || !title.trim() || title.trim().length > 160 || !['normal','high','low'].includes(priority)) throw new Error('Isi tugas 1–160 karakter dan pilih prioritas yang tersedia.'); const task = {id: crypto.randomUUID(), title: title.trim(), priority, done:false}; tasks.unshift(task); save(); return task; }
function render() {
  const done = tasks.filter(t => t.done).length;
  const percent = tasks.length ? Math.round(done / tasks.length * 100) : 0;
  $('#total').textContent = tasks.length; $('#completed').textContent = done; $('#remaining').textContent = tasks.length - done; $('#percentage').textContent = `${percent}%`; $('#progress').style.width = `${percent}%`;
  const visible = tasks.filter(t => filter === 'all' || (filter === 'done' ? t.done : !t.done));
  $('#list-count').textContent = `${visible.length} tugas`; $('#task-list').replaceChildren(); $('#empty').hidden = visible.length > 0;
  $('#empty h3').textContent = tasks.length ? 'Belum ada tugas di sini.' : 'Mulai dengan satu hal kecil.';
  $('#empty p').textContent = tasks.length ? 'Pilih filter lain atau tambahkan tugas baru.' : 'Tambahkan tugas pertamamu di atas. Langkah kecil juga sebuah kemajuan.';
  for (const task of visible) {
    const li = document.createElement('li'); li.className = `task${task.done ? ' done' : ''}`;
    const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.checked = task.done; checkbox.setAttribute('aria-label', `Tandai ${task.title} ${task.done ? 'belum selesai' : 'selesai'}`); checkbox.addEventListener('change', () => { task.done = checkbox.checked; save(); if (task.done) notify('Satu langkah selesai. Kerja bagus!'); });
    const content = document.createElement('div'); content.className = 'task-content';
    const title = document.createElement('span'); title.className = 'task-title'; title.textContent = task.title;
    const badge = document.createElement('span'); badge.className = `badge ${task.priority}`; badge.textContent = {normal:'Normal',high:'Penting',low:'Santai'}[task.priority]; content.append(title,badge);
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'delete'; remove.textContent = '×'; remove.setAttribute('aria-label', `Hapus ${task.title}`); remove.addEventListener('click', () => { tasks = tasks.filter(t => t.id !== task.id); save(); notify('Tugas dihapus.'); });
    li.append(checkbox,content,remove); $('#task-list').append(li);
  }
}
$('#task-form').addEventListener('submit', event => { event.preventDefault(); try { addTask($('#task-input').value, $('#priority').value); $('#task-input').value = ''; $('#task-input').focus(); } catch(error) { notify(error.message); } });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active',b === button); b.setAttribute('aria-pressed',String(b === button)); }); render(); }));
function updateDate() { $('#date').textContent = new Intl.DateTimeFormat('id-ID', {weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date()).toUpperCase(); } updateDate(); setInterval(updateDate,60000);
let duration = 25 * 60, seconds = duration, running = false, deadline = 0, interval = null;
function paintTimer() { $('#timer-display').textContent = `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`; $('#timer-toggle').textContent = running ? 'Jeda sesi Ⅱ' : seconds === 0 ? 'Mulai lagi ▷' : duration === 300 ? 'Mulai istirahat ▷' : 'Mulai fokus ▷'; }
function pause() { if (running) seconds = Math.max(0,Math.ceil((deadline - Date.now()) / 1000)); running = false; clearInterval(interval); interval = null; paintTimer(); }
function tick() { seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000)); if (!seconds) { pause(); notify(duration === 300 ? 'Istirahat selesai. Siap melangkah lagi?' : 'Sesi fokus selesai. Saatnya istirahat sejenak.'); $('#timer-tip').textContent = 'Sesi selesai. Beri dirimu jeda yang layak.'; } paintTimer(); }
$('#timer-toggle').addEventListener('click', () => { if (running) { pause(); return; } if (!seconds) seconds = duration; running = true; deadline = Date.now() + seconds * 1000; interval = setInterval(tick,250); paintTimer(); });
$('#timer-reset').addEventListener('click', () => { pause(); seconds = duration; $('#timer-tip').textContent = 'Singkirkan distraksi, ambil napas, lalu mulai.'; paintTimer(); });
document.querySelectorAll('[data-minutes]').forEach(button => button.addEventListener('click', () => { pause(); duration = Number(button.dataset.minutes) * 60; seconds = duration; document.querySelectorAll('[data-minutes]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed',String(b === button)); }); $('#timer-caption').textContent = duration === 300 ? 'JEDA UNTUK DIRIMU' : 'MENIT UNTUK DIRIMU'; $('#timer-tip').textContent = duration === 300 ? 'Regangkan tubuh dan istirahatkan mata.' : 'Singkirkan distraksi, ambil napas, lalu mulai.'; paintTimer(); }));
document.addEventListener('visibilitychange', () => { if (running) tick(); });
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  const tools = [
    {name:'list_tasks',description:'Read the tasks in this browser.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute:() => ({tasks:tasks.map(t => ({...t}))})},
    {name:'add_task',description:'Create a task and update the visible task list.',inputSchema:{type:'object',properties:{title:{type:'string',minLength:1,maxLength:160},priority:{type:'string',enum:['normal','high','low']}},required:['title'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute:input => { if (!input || typeof input !== 'object' || Object.keys(input).some(k => !['title','priority'].includes(k))) throw new Error('Invalid input'); return {...addTask(input.title,input.priority ?? 'normal')}; }}
  ];
  for (const tool of tools) { try { Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(() => {}); } catch {} }
  window.addEventListener('pagehide', () => lifecycle.abort(), {once:true});
}
render(); paintTimer();
