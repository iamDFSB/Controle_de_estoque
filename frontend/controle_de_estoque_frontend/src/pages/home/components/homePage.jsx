import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Skeleton,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  LocalMall as LocalMallIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 🎨 Cores para os gráficos
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

function HomePage() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // 📊 Dados computados com useMemo para otimizar performance
  const stockValue = useMemo(() => {
    // Garante que products é um array antes de usar reduce
    const productsArray = Array.isArray(products) ? products : [];
    return productsArray.reduce((acc, p) => acc + (p.price || 0) * (p.quantity || 0), 0);
  }, [products]);

  const totalProducts = useMemo(() => {
    // Total de produtos únicos
    const productsArray = Array.isArray(products) ? products : [];
    return productsArray.length;
  }, [products]);

  const pieData = useMemo(() => {
    // Garante que products é um array antes de usar map
    const productsArray = Array.isArray(products) ? products : [];
    if (productsArray.length === 0) {
      // Dados placeholder quando não há produtos
      return [
        { name: 'Sem dados', value: 1 }
      ];
    }
    return productsArray.map((p) => ({
      name: p.name || 'Produto sem nome',
      value: p.quantity || 0,
    }));
  }, [products]);

  const barData = useMemo(() => {
    // Garante que sales é um array antes de usar slice e map
    const salesArray = Array.isArray(sales) ? sales : [];
    if (salesArray.length === 0) {
      // Dados placeholder quando não há vendas
      return [
        { name: 'Sem vendas', total: 0 },
        { name: '', total: 0 },
        { name: '', total: 0 }
      ];
    }
    return salesArray.slice(-5).map((s) => ({
      name: s.product_name || 'Produto sem nome',
      total: s.total_price || 0,
    }));
  }, [sales]);

  const recentSales = useMemo(() => {
    // Garante que sales é um array antes de usar slice
    const salesArray = Array.isArray(sales) ? sales : [];
    return salesArray.slice(-5);
  }, [sales]);

  // 🔄 Função para buscar dados com tratamento de erro
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [productsResponse, salesResponse, employeesResponse] = await Promise.all([
        fetch(import.meta.env.VITE_PRODUCT_API_URL).then(res => {
          if (!res.ok) throw new Error('Erro ao carregar produtos');
          return res.json();
        }),
        fetch(import.meta.env.VITE_SALE_API_URL).then(res => {
          if (!res.ok) throw new Error('Erro ao carregar vendas');
          return res.json();
        }),
        fetch(import.meta.env.VITE_EMPLOYEE_API_URL).then(res => {
          if (!res.ok) throw new Error('Erro ao carregar funcionários');
          return res.json();
        }).catch(() => ({ employees: [] })) // Funcionários são opcionais
      ]);

      // Extrair dados dos objetos aninhados conforme o formato da API
      const productsData = productsResponse?.products?.products || [];
      const salesData = salesResponse?.sales?.sales || [];
      const employeesData = employeesResponse?.employees || [];

      // Garantir que sempre seja um array
      setProducts(Array.isArray(productsData) ? productsData : []);
      setSales(Array.isArray(salesData) ? salesData : []);
      
      console.log('Dados carregados:', { 
        products: Array.isArray(productsData) ? productsData.length : 'não é array',
        sales: Array.isArray(salesData) ? salesData.length : 'não é array',
        employees: Array.isArray(employeesData) ? employeesData.length : 'não é array'
      });
      
    } catch (err) {
      console.warn('Não foi possível carregar dados da API, usando dados zerados:', err);
      // Em caso de erro, define arrays vazios para mostrar dashboard zerado
      setProducts([]);
      setSales([]);
      setError(null); // Não mostra erro, apenas dashboard zerado
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🎨 Componente de Loading
  const LoadingSkeleton = () => (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { 
        xs: '1fr', 
        md: 'repeat(2, 1fr)' 
      },
      gap: 3,
      marginTop: 3
    }}>
      {[...Array(4)].map((_, index) => (
        <Paper key={index} sx={{ padding: 3, borderRadius: 3 }}>
          <Skeleton variant="text" height={40} width="60%" />
          <Skeleton variant="rectangular" height={200} sx={{ mt: 2 }} />
        </Paper>
      ))}
    </Box>
  );

  // 📱 Configurações responsivas para gráficos
  const pieChartHeight = isSmall ? 280 : isMobile ? 320 : 380;
  const barChartHeight = isSmall ? 250 : isMobile ? 280 : 320;
  const pieRadius = isSmall ? 80 : isMobile ? 100 : 120;

  if (loading) {
    return (
      <Box sx={{ 
        padding: { xs: 2, sm: 3, md: 4 }, 
        backgroundColor: "#f9fafb", 
        minHeight: "100vh" 
      }}>
        <Typography variant={isSmall ? "h5" : "h4"} fontWeight={600} gutterBottom>
          📊 Dashboard de Controle de Estoque
        </Typography>
        <LoadingSkeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        padding: { xs: 2, sm: 3, md: 4 }, 
        backgroundColor: "#f9fafb", 
        minHeight: "100vh" 
      }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography variant="body1">
          Não foi possível carregar os dados. Tente novamente mais tarde.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      padding: { xs: 2, sm: 3, md: 4 }, 
      backgroundColor: "#f9fafb", 
      minHeight: "100vh",
      width: "100%"
    }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
        {/* Valor Total do Estoque no Header */}
        <Paper sx={{
          padding: { xs: 2, md: 3 },
          borderRadius: 3,
          textAlign: "center",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
          mb: 3
        }}>
          <Typography 
            variant={isSmall ? "h6" : "h5"} 
            gutterBottom 
            sx={{ opacity: 0.9 }}
          >
            💰 Valor Total do Estoque
          </Typography>
          <Typography 
            variant={isSmall ? "h4" : "h3"} 
            fontWeight={700}
            sx={{ 
              wordBreak: 'break-word',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            R$ {stockValue.toLocaleString("pt-BR")}
          </Typography>
        </Paper>
      </Box>

      {/* CSS Grid Layout */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { 
          xs: '1fr', 
          md: 'repeat(2, 1fr)' 
        },
        gridTemplateRows: { 
          xs: 'auto auto auto auto', 
          md: 'auto auto auto' 
        },
        gap: { xs: 2, md: 3 },
        gridTemplateAreas: {
          xs: `
            "products"
            "pie"
            "bar"
            "sales"
          `,
          md: `
            "products pie"
            "bar sales"
          `
        }
      }}>
        
        {/* Total de Produtos Cadastrados */}
        <Paper sx={{ 
          gridArea: "products",
          padding: { xs: 2, md: 3 }, 
          borderRadius: 3, 
          textAlign: "center",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: { xs: 80, md: 100 },
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)'
        }}>
          <Typography 
            variant={isSmall ? "subtitle2" : "subtitle1"} 
            gutterBottom 
            sx={{ opacity: 0.9 }}
          >
            📦 Total de Produtos
          </Typography>
          <Typography 
            variant={isSmall ? "h5" : "h4"} 
            fontWeight={700}
            sx={{ 
              wordBreak: 'break-word',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {totalProducts} {totalProducts === 1 ? 'Produto' : 'Produtos'}
          </Typography>
        </Paper>

        {/* Gráfico de Pizza - AUMENTADO */}
        <Paper sx={{ 
          gridArea: "pie",
          padding: { xs: 2, md: 3 }, 
          borderRadius: 3,
          minHeight: { xs: 300, md: 400 },
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <Typography 
            variant={isSmall ? "subtitle1" : "h6"} 
            gutterBottom
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
              mb: 2
            }}
          >
            🥧 Distribuição de Produtos
          </Typography>
          <ResponsiveContainer width="100%" height={pieChartHeight}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={pieRadius}
                innerRadius={pieRadius * 0.4} // Donut chart
                label={!isSmall && products.length > 0}
                labelLine={false}
                fill={products.length === 0 ? "#E0E0E0" : undefined}
              >
                {pieData.map((_, index) => (
                  <Cell 
                    key={index} 
                    fill={Array.isArray(products) && products.length === 0 ? "#E0E0E0" : COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => Array.isArray(products) && products.length === 0 ? ['Nenhum produto', 'Status'] : [value, name]}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {(!Array.isArray(products) || products.length === 0) && (
            <Typography 
              variant="caption" 
              color="text.secondary" 
              textAlign="center" 
              display="block"
              sx={{ mt: -2 }}
            >
              Nenhum produto cadastrado
            </Typography>
          )}
        </Paper>

        {/* Gráfico de Barras */}
        <Paper sx={{ 
          gridArea: "bar",
          padding: { xs: 2, md: 3 }, 
          borderRadius: 3,
          minHeight: { xs: 280, md: 350 },
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <Typography 
            variant={isSmall ? "subtitle1" : "h6"} 
            gutterBottom
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
              mb: 2
            }}
          >
            📊 Últimas Vendas por Produto
          </Typography>
          <ResponsiveContainer width="100%" height={barChartHeight}>
            <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: isSmall ? 10 : 12 }}
                angle={isSmall ? -45 : 0}
                textAnchor={isSmall ? 'end' : 'middle'}
                height={isSmall ? 60 : 40}
              />
              <YAxis 
                tick={{ fontSize: isSmall ? 10 : 12 }}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip 
                formatter={(value) => Array.isArray(sales) && sales.length === 0 ? ['R$ 0,00', 'Total'] : [`R$ ${value?.toLocaleString?.('pt-BR') || value}`, 'Total']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
                }}
              />
              {!isSmall && <Legend />}
              <Bar 
                dataKey="total" 
                fill={Array.isArray(sales) && sales.length === 0 ? "#E0E0E0" : "#0088FE"}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          {(!Array.isArray(sales) || sales.length === 0) && (
            <Typography 
              variant="caption" 
              color="text.secondary" 
              textAlign="center" 
              display="block"
              sx={{ mt: 1 }}
            >
              Nenhuma venda registrada
            </Typography>
          )}
        </Paper>

        {/* Lista de Vendas */}
        <Paper sx={{ 
          gridArea: "sales",
          padding: { xs: 2, md: 3 }, 
          borderRadius: 3,
          minHeight: { xs: 280, md: 350 },
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <Typography 
            variant={isSmall ? "subtitle1" : "h6"} 
            gutterBottom
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary'
            }}
          >
            📜 Histórico de Vendas Recentes
          </Typography>
          <Divider sx={{ mb: 2, opacity: 0.6 }} />
          
          {recentSales.length > 0 ? (
            <List sx={{ 
              maxHeight: { xs: 220, md: 280 }, 
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#c1c1c1',
                borderRadius: '4px',
              }
            }}>
              {recentSales.map((s, idx) => (
                <ListItem 
                  key={`${s.id || s.product_name}-${idx}`} 
                  divider
                  sx={{ 
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    py: { xs: 1.5, sm: 1 },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 136, 254, 0.04)',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body2" 
                        fontWeight={500}
                        sx={{ 
                          fontSize: { xs: '0.85rem', md: '0.9rem' },
                          color: 'text.primary'
                        }}
                      >
                        {s.product_name} - R$ {s.total_price?.toLocaleString?.('pt-BR') || s.total_price}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: { xs: 0.5, sm: 0 } }}>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          display="block"
                        >
                          {s.sale_date}
                        </Typography>
                        {s.employee_name && (
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            display="block"
                          >
                            Vendedor: {s.employee_name}
                          </Typography>
                        )}
                        {s.quantity && (
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            display="block"
                          >
                            Qtd: {s.quantity}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                📊 Dashboard Iniciado
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ainda não há vendas registradas.<br/>
                Quando houver dados, eles aparecerão aqui automaticamente.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default HomePage;