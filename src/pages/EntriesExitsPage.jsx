import React, { useEffect, useState } from 'react';
import { createEntryExit, deleteEntryExit, getEntriesExits, updateEntryExit } from '../api/entriesExitService';
import EntryExitForm from '../components/entries-exits/EntryExitForm';
import EntryExitList from '../components/entries-exits/EntryExitList';

const EntriesExitsPage = () => {
  const [entriesExits, setEntriesExits] = useState([]);
  const [editingEntryExit, setEditingEntryExit] = useState(null);

  const fetchEntriesExits = async () => {
    const data = await getEntriesExits();
    setEntriesExits(data);
  };

  const handleCreateEntryExit = async (entryExitData) => {
    await createEntryExit(entryExitData);
    fetchEntriesExits();
  };

  const handleUpdateEntryExit = async (id, entryExitData) => {
    await updateEntryExit(id, entryExitData);
    fetchEntriesExits();
    setEditingEntryExit(null);
  };

  const handleDeleteEntryExit = async (id) => {
    await deleteEntryExit(id);
    fetchEntriesExits();
  };

  useEffect(() => {
    fetchEntriesExits();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Entradas e Saídas</h1>

      <EntryExitForm
        onSubmit={editingEntryExit ? (data) => handleUpdateEntryExit(editingEntryExit.id_movement, data) : handleCreateEntryExit}
        initialData={editingEntryExit}
        buttonText={editingEntryExit ? 'Atualizar Movimento' : 'Registrar Movimento'}
      />

      <h2 className="text-2xl font-bold mt-6 mb-4">Movimentos já registrados</h2>
      <EntryExitList entriesExits={entriesExits} onEdit={setEditingEntryExit} onDelete={handleDeleteEntryExit} />
    </div>
  );
};

export default EntriesExitsPage;
