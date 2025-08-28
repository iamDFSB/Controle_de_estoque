from pydantic import BaseModel
from typing import Any, List, Optional
from datetime import datetime


class Empresa(BaseModel):
    nome: str
    cnpj: Optional[str] = None
    contato: Optional[str] = None


class Produto(BaseModel):
    nome: str
    quantidade: int
    precoUnitario: float
    subtotal: float
    fornecedor: Optional[str] = None


class Project(BaseModel):
    id: Any
    nome: str
    descricao: Optional[str] = None
    empresa: Empresa
    produtos: List[Produto]
    valorTotal: float
    dataInicio: str  # Format: YYYY-MM-DD
    dataFim: Optional[str] = None  # Format: YYYY-MM-DD
    status: str  # "Proposta Comercial", "Iniciado", "Em andamento", "Concluído", "Cancelado"
    responsavel: str
    criadoEm: Any  # Timestamp
    atualizadoEm: Any  # Timestamp


class ProjectPayload(BaseModel):
    nome: str
    descricao: Optional[str] = None
    empresa: Empresa
    produtos: List[Produto]
    valorTotal: float
    dataInicio: str  # Format: YYYY-MM-DD
    dataFim: Optional[str] = None  # Format: YYYY-MM-DD
    status: str  # "Proposta Comercial", "Iniciado", "Em andamento", "Concluído", "Cancelado"
    responsavel: str