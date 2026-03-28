import { useState } from 'react';
import './ManageAnnouncements.css';
import { useApp } from '../../core/utils/constants';
import AlertBanner from '../../core/components/AlertBanner';
import { Btn, Card } from '../../core/components/DataTable';

export default function ManageAnnouncements() {
  const { addAlert } = useApp();
  const [title,      setTitle]      = useState('');
  const [type,       setType]       = useState('General');
  const [body,       setBody]       = useState('');
  const [publishing, setPublishing] = useState(false);

  const publish = async () => {
    if (!title.trim()) return;
    setPublishing(true);
    await new Promise(r => setTimeout(r, 1200));
    setPublishing(false);
    addAlert('success', `Announcement "${title}" published.`);
    setTitle(''); setBody('');
  };

  return (
    <Card title="Publish Announcement">
      <AlertBanner type="info" message="Published announcements appear in the Notices module for all users." />
      <div className="manage-ann-form">
        <input
          placeholder="Announcement title *"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          {['Academic', 'Event', 'General', 'Urgent'].map(t => <option key={t}>{t}</option>)}
        </select>
        <textarea
          rows={4}
          placeholder="Announcement body..."
          value={body}
          onChange={e => setBody(e.target.value)}
          style={{ resize: 'vertical' }}
        />
        <div className="manage-ann-actions">
          <Btn onClick={publish} disabled={publishing || !title.trim()}>
            {publishing ? 'Publishing...' : 'Publish'}
          </Btn>
          <Btn variant="ghost" onClick={() => { setTitle(''); setBody(''); }}>Clear</Btn>
        </div>
      </div>
    </Card>
  );
}
