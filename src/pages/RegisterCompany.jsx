import React, { useState } from 'react';

export default function RegisterCompany() {
  const [form, setForm] = useState({
    companyName: '',
    licenseNumber: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    address: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await fetch('https://us-central1-security-reporting-app-e987a.cloudfunctions.net/emailSekkiSupport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setStatus('✅ Sent to Sekki Support.');
      } else {
        setStatus('❌ Failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Error sending request.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#1a1a1a', color: '#00ff88', padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h2>Register Security Company</h2>
      {Object.keys(form).map((key) => (
        <div key={key} style={{ marginBottom: 10 }}>
          <input
            name={key}
            placeholder={key.replace(/([A-Z])/g, ' $1')}
            value={form[key]}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #444' }}
          />
        </div>
      ))}
      <button type="submit" style={{ background: '#00ff88', color: '#000', padding: 10, borderRadius: 4 }}>Submit</button>
      <p style={{ marginTop: 10 }}>{status}</p>
    </form>
  );
}
