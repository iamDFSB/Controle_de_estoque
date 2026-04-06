import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Paper,
  TableContainer,
} from '@mui/material';
import { getRfidEvents } from './api/getRfidEvents';

const POLL_INTERVAL_MS = 5000;

const directionChip = (direction) => (
  <Chip
    label={direction}
    color={direction === 'OUT' ? 'error' : 'success'}
    size="small"
    variant="outlined"
  />
);

export default function RfidEventLog() {
  const [events, setEvents] = useState([]);
  const [erro, setErro] = useState(null);

  const fetchEvents = () => {
    getRfidEvents()
      .then(setEvents)
      .catch(() => setErro('Erro ao buscar eventos RFID'));
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ padding: 4, minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        RFID Event Log
      </Typography>

      {erro && (
        <Typography color="error" sx={{ mb: 2 }}>
          {erro}
        </Typography>
      )}

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#1e1e2f' }}>
            <TableRow>
              {['Tag ID', 'Leitor', 'Zona', 'Direção', 'Timestamp'].map((h) => (
                <TableCell key={h} sx={{ color: '#fff', fontWeight: 600 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, color: '#888' }}>
                  Nenhum evento registrado ainda.
                </TableCell>
              </TableRow>
            ) : (
              events.map((e) => (
                <TableRow key={e.id} hover>
                  <TableCell>{e.tag_id}</TableCell>
                  <TableCell>{e.reader_id}</TableCell>
                  <TableCell>{e.zone}</TableCell>
                  <TableCell>{directionChip(e.direction)}</TableCell>
                  <TableCell>{e.timestamp}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
