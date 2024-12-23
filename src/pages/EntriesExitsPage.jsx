import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createEntryExit, deleteEntryExit, getEntriesExits, updateEntryExit } from '../api/entriesExitService';
import EntryExitForm from '../components/entries-exits/EntryExitForm';
import EntryExitList from '../components/entries-exits/EntryExitList';

const EntriesExitsPage = () => {
  const [entriesExits, setEntriesExits] = useState([]);
  const [editingEntryExit, setEditingEntryExit] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Adicionado para o campo de busca

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

  const filteredEntriesExits = entriesExits.filter((entryExit) => {
    const { license_plate, model, color } = entryExit.vehicle;
    const lowerSearch = searchTerm.toLowerCase();

    return (
      license_plate.toLowerCase().includes(lowerSearch) ||
      model.toLowerCase().includes(lowerSearch) ||
      color.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="container mx-auto p-4">
      <Link to="/home" className="text-blue-500 hover:text-blue-700 font-semibold">
        ← Voltar
      </Link>
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Entradas e Saídas</h1>

      <EntryExitForm
        onSubmit={editingEntryExit ? (data) => handleUpdateEntryExit(editingEntryExit.id_movement, data) : handleCreateEntryExit}
        initialData={editingEntryExit}
        buttonText={editingEntryExit ? 'Atualizar Movimento' : 'Registrar Movimento'}
      />

      <h2 className="text-2xl font-bold mt-6 mb-4">Movimentos já registrados</h2>

      <input
        type="text"
        placeholder="Buscar por placa..."
        className="mb-4 p-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <EntryExitList
        entriesExits={filteredEntriesExits}
        onEdit={setEditingEntryExit}
        onDelete={handleDeleteEntryExit}
      />
    </div>
  );
};

export default EntriesExitsPage;
