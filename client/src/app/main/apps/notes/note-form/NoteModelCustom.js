import { FuseUtils } from '@fuse';

function NoteModelCustom(data, profile) {
  let notes = JSON.parse(profile.notes)
  const item = data ? data : {};
  return {
    id: item.id || FuseUtils.generateGUID(),
    title: item.title || '',
    description: item.description || '',
    archive: item.archive || false,
    image: item.image || '',
    time: item.time || null,
    reminder: item.reminder || null,
    checklist: item.checklist || [],
    labels: item.labels || []
  }
}

export default NoteModelCustom;
