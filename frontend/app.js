const API_BASE = 'http://localhost:5000/api/employees';

let employees = [];
let selectedId = null;

const empIdInput = document.getElementById('empId');
const fullNameInput = document.getElementById('fullName');
const empAgeInput = document.getElementById('empAge');
const empPhoneInput = document.getElementById('empPhone');

const btnInsert = document.getElementById('btnInsert');
const btnUpdate = document.getElementById('btnUpdate');
const btnDelete = document.getElementById('btnDelete');

const gridBody = document.getElementById('gridBody');
const statusMessage = document.getElementById('statusMessage');

document.addEventListener('DOMContentLoaded', () => {
  loadData();

  btnInsert.addEventListener('click', handleInsert);
  btnUpdate.addEventListener('click', handleUpdate);
  btnDelete.addEventListener('click', handleDelete);
});

async function loadData() {
  try {
    const res = await fetch(API_BASE);
    const result = await res.json();
    if (result.success) {
      employees = result.data || [];
      renderGrid(employees);
    }
  } catch (err) {
    setStatus('ข้อผิดพลาด: ไม่สามารถเชื่อมต่อ Backend API (http://localhost:5000) ได้ กรุณาเปิด Backend ก่อน');
  }
}

function renderGrid(data) {
  gridBody.innerHTML = '';

  data.forEach(emp => {
    const tr = document.createElement('tr');
    tr.dataset.id = emp.emp_id;

    const isSelected = selectedId === emp.emp_id;
    if (isSelected) {
      tr.classList.add('selected');
    }

    tr.innerHTML = `
      <td class="row-indicator">${isSelected ? '▶' : ''}</td>
      <td>${escapeHtml(emp.emp_id)}</td>
      <td>${escapeHtml(emp.fullname)}</td>
      <td style="text-align: center;">${emp.age}</td>
      <td>${escapeHtml(emp.phone)}</td>
    `;

    // Row selection on click
    tr.addEventListener('click', () => {
      selectRow(emp.emp_id);
    });

    gridBody.appendChild(tr);
  });
}

function selectRow(id) {
  const emp = employees.find(e => e.emp_id === id);
  if (!emp) return;

  selectedId = emp.emp_id;
  empIdInput.value = emp.emp_id;
  fullNameInput.value = emp.fullname;
  empAgeInput.value = emp.age;
  empPhoneInput.value = emp.phone;

  // Update row selection style and pointer
  document.querySelectorAll('#gridBody tr').forEach(row => {
    const match = row.dataset.id === id;
    row.classList.toggle('selected', match);
    const indicator = row.querySelector('.row-indicator');
    if (indicator) {
      indicator.textContent = match ? '▶' : '';
    }
  });

  setStatus(`เลือกรายการรหัส: ${emp.emp_id} (${emp.fullname})`);
}

async function handleInsert() {
  const emp_id = empIdInput.value.trim();
  const fullname = fullNameInput.value.trim();
  const age = empAgeInput.value.trim();
  const phone = empPhoneInput.value.trim();

  if (!emp_id) {
    alert('กรุณากรอก รหัสพนักงาน');
    empIdInput.focus();
    return;
  }
  if (!fullname) {
    alert('กรุณากรอก ชื่อ นามสกุล');
    fullNameInput.focus();
    return;
  }
  if (!age || isNaN(age) || parseInt(age, 10) <= 0) {
    alert('กรุณากรอก อายุ ให้ถูกต้อง');
    empAgeInput.focus();
    return;
  }
  if (!phone) {
    alert('กรุณากรอก เบอร์โทร');
    empPhoneInput.focus();
    return;
  }

  btnInsert.disabled = true;

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emp_id, fullname, age, phone })
    });
    const result = await res.json();

    if (result.success) {
      setStatus(`INSERT สำเร็จ: บันทึกข้อมูล ${emp_id} เรียบร้อยแล้ว`);
      clearInputs();
      await loadData();
      selectRow(emp_id);
    } else {
      alert(result.message || 'บันทึกไม่สำเร็จ');
      setStatus(`INSERT ไม่สำเร็จ: ${result.message}`);
    }
  } catch (err) {
    alert('เกิดข้อผิดพลาดในการเชื่อมต่อ Backend API');
  } finally {
    btnInsert.disabled = false;
  }
}

async function handleUpdate() {
  const emp_id = empIdInput.value.trim();
  const fullname = fullNameInput.value.trim();
  const age = empAgeInput.value.trim();
  const phone = empPhoneInput.value.trim();

  if (!emp_id) {
    alert('กรุณาระบุ รหัสพนักงาน ที่ต้องการแก้ไข');
    empIdInput.focus();
    return;
  }
  if (!fullname) {
    alert('กรุณากรอก ชื่อ นามสกุล');
    fullNameInput.focus();
    return;
  }
  if (!age || isNaN(age) || parseInt(age, 10) <= 0) {
    alert('กรุณากรอก อายุ ให้ถูกต้อง');
    empAgeInput.focus();
    return;
  }
  if (!phone) {
    alert('กรุณากรอก เบอร์โทร');
    empPhoneInput.focus();
    return;
  }

  btnUpdate.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(emp_id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullname, age, phone })
    });
    const result = await res.json();

    if (result.success) {
      setStatus(`UPDATE สำเร็จ: แก้ไขข้อมูล ${emp_id} เรียบร้อยแล้ว`);
      await loadData();
      selectRow(emp_id);
    } else {
      alert(result.message || 'แก้ไขไม่สำเร็จ');
      setStatus(`UPDATE ไม่สำเร็จ: ${result.message}`);
    }
  } catch (err) {
    alert('เกิดข้อผิดพลาดในการเชื่อมต่อ Backend API');
  } finally {
    btnUpdate.disabled = false;
  }
}

async function handleDelete() {
  const emp_id = empIdInput.value.trim();

  if (!emp_id) {
    alert('กรุณาระบุ รหัสพนักงาน ที่ต้องการลบ');
    empIdInput.focus();
    return;
  }

  if (!confirm(`คุณต้องการลบข้อมูลรหัสพนักงาน "${emp_id}" ออกจากฐานข้อมูลหรือไม่?`)) {
    return;
  }

  btnDelete.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(emp_id)}`, {
      method: 'DELETE'
    });
    const result = await res.json();

    if (result.success) {
      setStatus(`DELETE สำเร็จ: ลบข้อมูล ${emp_id} ออกจากฐานข้อมูลแล้ว`);
      clearInputs();
      selectedId = null;
      await loadData();
    } else {
      alert(result.message || 'ลบไม่สำเร็จ');
      setStatus(`DELETE ไม่สำเร็จ: ${result.message}`);
    }
  } catch (err) {
    alert('เกิดข้อผิดพลาดในการเชื่อมต่อ Backend API');
  } finally {
    btnDelete.disabled = false;
  }
}

function clearInputs() {
  empIdInput.value = '';
  fullNameInput.value = '';
  empAgeInput.value = '';
  empPhoneInput.value = '';
}

function setStatus(msg) {
  if (statusMessage) {
    statusMessage.textContent = msg;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
