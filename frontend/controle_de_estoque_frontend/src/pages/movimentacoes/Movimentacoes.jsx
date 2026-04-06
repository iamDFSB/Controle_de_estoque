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
import { getMovements } from './api/getMovements';

const POLL_INTERVAL_MS = 5000;

const reasonLabel = {
  sale: { label: 'Venda', color: 'warning' },
  rfid_out: { label: 'RFID Saída', color: 'error' },
  rfid_in: { label: 'RFID Entrada', color: 'success' },
  manual_adjustment: { label: 'Ajuste Manual', color: 'info' },
};

const deltaChip = (delta) => (
  <Chip
    label={delta > 0 ? `+${delta}` : `${delta}`}
    color={delta > 0 ? 'success' : 'error'}
    size="small"
    variant="outlined"
  />
);

export default function Movimentacoes() {
  const [movements, setMovements] = useState([]);
  const [erro, setErro] = useState(null);

  const fetchMovements = () => {
    getMovements()
      .then(setMovements)
      .catch(() => setErro('Erro ao buscar movimentações'));
  };

  useEffect(() => {
    fetchMovements();
    const interval = setInterval(fetchMovements, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ padding: 4, minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Movimentações de Estoque
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
              {['Produto ID', 'Delta', 'Motivo', 'Referência', 'Timestamp'].map((h) => (
                <TableCell key={h} sx={{ color: '#fff', fontWeight: 600 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {movements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, color: '#888' }}>
                  Nenhuma movimentação registrada ainda.
                </TableCell>
              </TableRow>
            ) : (
              movements.map((m) => {
                const reason = reasonLabel[m.reason] ?? { label: m.reason, color: 'default' };
                return (
                  <TableRow key={m.id} hover>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {m.product_id}
                    </TableCell>
                    <TableCell>{deltaChip(m.delta)}</TableCell>
                    <TableCell>
                      <Chip label={reason.label} color={reason.color} size="small" />
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {m.reference_id}
                    </TableCell>
                    <TableCell>{m.timestamp}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
